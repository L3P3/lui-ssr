const {
	init,
	node_dom,
} = lui;

init(() => {
	return [
		node_dom('h1[innerText=Hello, World!]'),
	];
});
