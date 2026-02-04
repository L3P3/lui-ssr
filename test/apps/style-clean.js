// Test style attribute edge cases
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('div[innerText=should only have color:blue][style= color : blue ; transform : ]'),
	node_dom('div[innerText=should not have any style]', {
		S: {
			transform: '',
		},
	}),
]);
