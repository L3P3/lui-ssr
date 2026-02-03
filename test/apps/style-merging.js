// Test style attribute merging (style string + S object)
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Style Merging Test]'),
	node_dom('div', {
		style: 'color: blue; font-size: 16px',
		innerText: 'Style from string only',
	}),
	node_dom('div', {
		S: {
			color: 'red',
			fontSize: '20px',
		},
		innerText: 'Style from S object only',
	}),
	node_dom('div', {
		style: 'color: blue; text-decoration: underline',
		S: {
			fontSize: '18px',
			fontWeight: 'bold',
		},
		innerText: 'Style from both string and S object',
	}),
]);
