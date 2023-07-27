import * as inner from './inner.js';
const {
	tree,
	...lui
} = inner;

const context_default = {
	document: {
		cookie: '',
	},
	navigator: {
		userAgent: 'lui-ssr',
	},
	SSR: true,
};

/**
	Builds the app.js into a function that can be used to render the app.
	@param {string} src the app.js
	@returns {function(Object):string} the rendered html
*/
export default function build(src) {
	const fn = new Function('lui', 'window', 'document', 'navigator', src);
	return function run(context = null) {
		context = Object.assign({}, context_default, context);
		fn(lui, context, context.document, context.navigator);
		// console.log(JSON.stringify(tree, null, 2));
		return elements_to_html(tree);
	};
}

function elements_to_html(elements) {
	return elements.map(element_to_html).join('');
}

function element_to_html(element) {
	let html = `<${element.tag}`;

	const {className, D, F, innerHTML, innerText, R, S, style, ...attrs} = element.attrs;

	if (className) attrs['class'] = className;
	if (D) {
		for (const [key, value] of Object.entries(D)) {
			attrs['data-' + key] = value;
		}
	}
	if (F) {
		attrs['class'] = Object.keys(F)
			.map(key => F[key] ? key : '')
			.filter(Boolean)
			.join(' ');
	}

	let style_merged = [];
	if (style) {
		style_merged.push(
			...style.split(';')
			.map(s => s.trim())
		);
	}
	if (S) {
		style_merged.push(
			...Object.entries(S)
			.map(([key, value]) => `${camel_to_dashed(key)}:${value}`)
		);
	}

	for (const [key, value] of Object.entries(attrs)) {
		if (value === false) continue;
		if (typeof value === 'function') continue;
		if (key.startsWith('on')) continue;

		const attribute = camel_to_dashed(key);

		if (value === true) html += ` ${attribute}`;
		else html += ` ${attribute}="${html_escape(value)}"`;
	}

	if (style_merged.length) html += ` style="${html_escape(style_merged.join(';'))}"`;

	const text = innerHTML || innerText && html_escape(innerText);

	if (element.children && element.children.length || text) {
		html += '>';
		if (text) html += text;
		if (element.children) html += elements_to_html(element.children);
		html += `</${element.tag}>`;
	}
	else html += '/>';

	return html;
}

function html_escape(html) {
	return (
		String(html)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
	);
}

function camel_to_dashed(name) {
	return name.replace(
		/[A-Z]/g,
		match => '-' + match.toLowerCase()
	);
}
