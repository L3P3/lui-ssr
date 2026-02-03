// Test camelCase attribute conversion to kebab-case
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=CamelCase Attributes Test]'),
	node_dom('label', {
		htmlFor: 'myinput',
		innerText: 'Label with htmlFor',
	}),
	node_dom('input[type=text][id=myinput]', {
		tabIndex: 5,
		readOnly: true,
		maxLength: 10,
	}),
	node_dom('table', null, [
		node_dom('tr', null, [
			node_dom('td', {
				colSpan: 2,
				rowSpan: 1,
				innerText: 'Cell with span',
			}),
		]),
	]),
	node_dom('div', {
		contentEditable: true,
		innerText: 'Editable content',
	}),
]);
