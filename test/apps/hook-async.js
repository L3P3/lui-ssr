// Test hook_async with promises
const {
	hook_async,
	init,
	node_dom,
} = lui;

init(() => {
	// Async hook should return fallback during SSR since promises don't resolve
	const data = hook_async(() => Promise.resolve('resolved value'), [], 'loading...');
	
	return [
		node_dom('h1[innerText=Hook Async Test]'),
		node_dom('p', {
			innerText: 'Data: ' + data,
		}),
	];
});
