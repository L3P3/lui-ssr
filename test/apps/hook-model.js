// Test hook_model (should use init state)
const {
	hook_model,
	init,
	node_dom,
} = lui;

const counter_model = {
	init: () => 10,
	increment: (state) => state + 1,
	decrement: (state) => state - 1,
	reset: () => 0,
};

init(() => {
	const [count] = hook_model(counter_model);
	
	return [
		node_dom('h1[innerText=Hook Model Test]'),
		node_dom('p', {
			innerText: 'Counter: ' + count,
		}),
	];
});
