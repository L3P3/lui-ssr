// Test attributes with value as empty string
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Empty String Attributes Test]'),
	node_dom('input[type=text]', {
		value: '',
		placeholder: 'Enter text',
	}),
	node_dom('div', {
		title: '',
		innerText: 'Empty title',
	}),
	node_dom('a', {
		href: '',
		innerText: 'Empty href link',
	}),
]);
