import * as inner from './inner.js';
import vm from 'vm';

const {
	tree,
	...lui
} = inner;

const elements_no_close = new Set([
	'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
	'link', 'meta', 'param', 'source', 'track', 'wbr',
]);
const arguments_to_html = new Map([
	['className', 'class'],
	['htmlFor', 'for'],
	['tabIndex', 'tabindex'],
	['readOnly', 'readonly'],
	['maxLength', 'maxlength'],
	['cellSpacing', 'cellspacing'],
	['cellPadding', 'cellpadding'],
	['rowSpan', 'rowspan'],
	['colSpan', 'colspan'],
	['useMap', 'usemap'],
	['frameBorder', 'frameborder'],
	['contentEditable', 'contenteditable'],
]);
const argument_chars_to_quote = /[\s'`]/;

const NOP = () => {};

const context_default = {
	document: {
		cookie: '',
	},
	navigator: {
		userAgent: 'lui-ssr',
	},
	SSR: true,
	setTimeout: NOP,
	setInterval: NOP,
	setImmediate: NOP,
	clearTimeout: NOP,
	clearInterval: NOP,
	clearImmediate: NOP,
	requestAnimationFrame: NOP,
	cancelAnimationFrame: NOP,
	fetch: NOP,
	XMLHttpRequest: function() {},
	WebSocket: function() {},
	localStorage: {
		getItem: () => null,
		setItem: NOP,
		removeItem: NOP,
		clear: NOP,
	},
	sessionStorage: {
		getItem: () => null,
		setItem: NOP,
		removeItem: NOP,
		clear: NOP,
	},
	console: {
		log: NOP,
		error: NOP,
		warn: NOP,
		info: NOP,
		debug: NOP,
	},
};

/**
	Builds the app.js into a function that can be used to render the app.
	@param {string} src the app.js
	@param {number} timeout timeout in milliseconds (default: 5000)
	@returns {function(Object):string} the rendered html
*/
export default function build(src, timeout = 5000) {
	const script = new vm.Script(src);
	return function run(context = null) {
		context = Object.assign({}, context_default, context);
		
		// Create a sandboxed context with lui and browser globals
		const sandbox = {
			lui,
			window: context,
			document: context.document,
			navigator: context.navigator,
		};
		
		// Add all context properties to sandbox
		Object.assign(sandbox, context);
		
		try {
			script.runInNewContext(sandbox, {timeout});
		} catch (error) {
			if (error.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT') {
				throw new Error('App execution timed out');
			}
			throw error;
		}
		
		// console.log(JSON.stringify(tree, null, 2));
		return elements_to_html(tree);
	};
}

function elements_to_html(elements) {
	return elements.map(element_to_html).join('');
}

function element_to_html(element) {
	const {D, F, innerHTML, innerText, R, S, style, ...attrs} = element.attrs;

	if (D) {
		for (const [key, value] of Object.entries(D)) {
			attrs['data-' + camel_to_dashed(key)] = String(value);
		}
	}
	if (F) {
		const value = Object.keys(F)
			.map(key => F[key] ? key : '')
			.filter(Boolean)
			.join(' ');
		if (value) attrs['className'] = value;
		else delete attrs['className'];
	}

	{
		let style_merged = [];
		if (style) {
			style_merged.push(
				...style.split(';')
				.map(s =>
					s.trim()
					.replace(/\s*:\s*/, ':')
				)
				.filter(Boolean)
			);
		}
		if (S) {
			style_merged.push(
				...Object.entries(S)
				.map(([key, value]) => `${camel_to_dashed(key)}:${value}`)
			);
		}
		if (style_merged.length > 0) {
			attrs['style'] = style_merged.join(';');
		}
	}

	let html = `<${element.tag}`;
	for (const [key, value] of Object.entries(attrs)) {
		if (value === false) continue;
		if (typeof value === 'function') continue;
		if (key.startsWith('on')) continue;

		const attribute = camel_to_dashed(
			arguments_to_html.get(key) || key
		);

		if (value === true) {
			html += ` ${attribute}`;
			continue;
		}

		const value_str = String(value);
		const quote = (
			!value_str ||
			argument_chars_to_quote.test(value_str)
			?	'"'
			:	''
		);
		html += ` ${attribute}=${quote}${html_escape(value_str)}${quote}`;
	}

	if (!elements_no_close.has(element.tag)) {
		html += `>${
			innerHTML ||
			innerText && html_escape(String(innerText)) ||
			''
		}`;
		if (element.children) html += elements_to_html(element.children);
		html += `</${element.tag}>`;
	}
	else html += '>';

	return html;
}

function html_escape(html) {
	return (
		html
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
