// Test various HTML elements and attributes
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Various HTML Elements Test]'),
	node_dom('p[innerText=A paragraph]'),
	node_dom('a[href=https://example.com][target=_blank]', {
		innerText: 'A link',
	}),
	node_dom('img[src=/image.jpg][alt=An image]'),
	node_dom('input[type=text][placeholder=Enter text][name=myinput]'),
	node_dom('input[type=checkbox][checked]'),
	node_dom('button[type=submit][disabled]', {
		innerText: 'Disabled Button',
	}),
	node_dom('textarea[rows=5][cols=30]', {
		innerText: 'Default text',
	}),
	node_dom('select', null, [
		node_dom('option[value=1]', {innerText: 'Option 1'}),
		node_dom('option[value=2][selected]', {innerText: 'Option 2'}),
		node_dom('option[value=3]', {innerText: 'Option 3'}),
	]),
	node_dom('br'),
	node_dom('hr'),
	node_dom('label[for=myinput]', {
		innerText: 'My Input Label',
	}),
	node_dom('div[className=container]', null, [
		node_dom('span[innerText=Nested content]'),
	]),
]);
