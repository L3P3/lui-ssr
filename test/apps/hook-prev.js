// Test hook_prev (should return initial value on first render)
const {
	hook_prev,
	init,
	node_dom,
} = lui;

init(() => {
	const currentValue = 'current';
	const prevValue = hook_prev(currentValue, 'initial');
	
	return [
		node_dom('h1[innerText=Hook Prev Test]'),
		node_dom('p', {
			innerText: 'Current: ' + currentValue,
		}),
		node_dom('p', {
			innerText: 'Previous: ' + prevValue,
		}),
	];
});
