// Test with numeric attribute values
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Numeric Attributes Test]'),
	node_dom('input[type=range]', {
		min: 0,
		max: 100,
		value: 50,
		step: 5,
	}),
	node_dom('input[type=number]', {
		min: -10,
		max: 10,
		value: 0,
	}),
	node_dom('textarea', {
		rows: 10,
		cols: 50,
		maxLength: 500,
		innerText: 'Text area',
	}),
]);
