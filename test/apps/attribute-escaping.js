// Test proper HTML attribute escaping
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Attribute Escaping Test]'),
	node_dom('div', {
		innerText: 'Text with special chars: <>&"\'',
	}),
	node_dom('input[type=text]', {
		value: 'Value with "quotes" and \'apostrophes\'',
	}),
	node_dom('div', {
		title: 'Title with <tags> and & ampersand',
		innerText: 'Hover to see title',
	}),
	node_dom('a', {
		href: 'http://example.com?a=1&b=2',
		innerText: 'Link with query string',
	}),
]);
