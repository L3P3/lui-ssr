// Test attributes with special characters requiring quotes
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Attribute Quoting Test]'),
	// Attributes with spaces need quotes
	node_dom('div', {
		title: 'Title with spaces',
		innerText: 'Hover me',
	}),
	// Attributes with special chars
	node_dom('input[type=text]', {
		placeholder: 'Enter your name',
		value: 'John Doe',
	}),
	// Attributes without spaces don't need quotes
	node_dom('a', {
		href: 'https://example.com',
		innerText: 'link',
	}),
	// Attributes with backticks
	node_dom('div', {
		'data-value': 'test`value',
		innerText: 'Has backtick',
	}),
]);
