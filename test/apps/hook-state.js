// Test hook_state during SSR (should use initial value)
const {
	hook_state,
	init,
	node_dom,
} = lui;

init(() => {
	const [count] = hook_state(42);
	const [text] = hook_state('Initial Text');
	const [checked] = hook_state(true);
	
	return [
		node_dom('h1[innerText=Hook State Test]'),
		node_dom('p', {
			innerText: 'Count: ' + count,
		}),
		node_dom('p', {
			innerText: 'Text: ' + text,
		}),
		node_dom('input[type=checkbox]', {
			checked: checked,
		}),
	];
});
