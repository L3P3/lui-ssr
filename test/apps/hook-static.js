// Test hook_static (should return initial value)
const {
	hook_static,
	init,
	node_dom,
} = lui;

init(() => {
	const staticValue = hook_static('This is static');
	const staticNumber = hook_static(100);
	
	return [
		node_dom('h1[innerText=Hook Static Test]'),
		node_dom('p', {
			innerText: 'Static Value: ' + staticValue,
		}),
		node_dom('p', {
			innerText: 'Static Number: ' + staticNumber,
		}),
	];
});
