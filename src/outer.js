import * as inner from './inner.js';
const {
	tree,
	...lui
} = inner;

/**
	Builds the app.js into a function that can be used to render the app.
	@param {string} src the app.js
	@returns {function(Object):string} the rendered html
*/
export default function build(src) {
	const fn = new Function('lui', 'window', src);
	return function run(context = {}) {
		context.SSR = true;
		fn(lui, context);
		// TODO: tree -> html
		return `<!-- TODO -->`;
	};
}
