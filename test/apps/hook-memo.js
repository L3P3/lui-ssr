// Test hook_memo for data transformation
const {
	hook_memo,
	init,
	node_dom,
} = lui;

init(() => {
	const data = [1, 2, 3, 4, 5];
	const sum = hook_memo((data) => data.reduce((a, b) => a + b, 0), [data]);
	const doubled = hook_memo((data) => data.map(x => x * 2), [data]);
	
	return [
		node_dom('h1[innerText=Hook Memo Test]'),
		node_dom('p', {
			innerText: 'Sum: ' + sum,
		}),
		node_dom('p', {
			innerText: 'Doubled: ' + doubled.join(', '),
		}),
	];
});
