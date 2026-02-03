// Test combining multiple hooks in one component
const {
	hook_memo,
	hook_state,
	hook_static,
	init,
	node_dom,
} = lui;

init(() => {
	const [count] = hook_state(5);
	const doubled = hook_memo((c) => c * 2, [count]);
	const label = hook_static('Counter:');
	
	return [
		node_dom('h1[innerText=Multiple Hooks Test]'),
		node_dom('p', {
			innerText: label + ' ' + count,
		}),
		node_dom('p', {
			innerText: 'Doubled: ' + doubled,
		}),
	];
});
