// Test special attributes: D (dataset), F (css classes), S (styles)
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Special Attributes Test]'),
	node_dom('div', {
		D: {
			userId: '123',
			itemType: 'product',
		},
		innerText: 'Element with data attributes',
	}),
	node_dom('div', {
		F: {
			active: true,
			disabled: false,
			'large-text': true,
		},
		innerText: 'Element with CSS classes',
	}),
	node_dom('div', {
		S: {
			color: 'purple',
			fontSize: '20px',
			textAlign: 'center',
		},
		innerText: 'Element with inline styles',
	}),
	node_dom('div', {
		D: {foo: 'bar'},
		F: {highlight: true},
		S: {backgroundColor: 'yellow'},
		innerText: 'Element with all three',
	}),
]);
