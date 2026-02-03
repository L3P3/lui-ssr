// Test template inheritance (dom_define with extension)
const {
	dom_define,
	init,
	node_dom,
} = lui;

// Define base template
dom_define('base-button', 'button', {
	S: {
		padding: '10px',
		border: '1px solid black',
	},
});

// Extend base template
dom_define('primary-button', '#base-button', {
	S: {
		backgroundColor: 'blue',
		color: 'white',
	},
});

// Extend again
dom_define('large-primary-button', '#primary-button', {
	S: {
		fontSize: '20px',
	},
});

init(() => [
	node_dom('h1[innerText=Template Inheritance Test]'),
	node_dom('#base-button', {
		innerText: 'Base Button',
	}),
	node_dom('#primary-button', {
		innerText: 'Primary Button',
	}),
	node_dom('#large-primary-button', {
		innerText: 'Large Primary Button',
	}),
]);
