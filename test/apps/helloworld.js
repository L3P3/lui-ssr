const {
	init,
	node_dom,
} = lui;

init(() => {
	return [null, [
		node_dom('h1[innerText=Hello, World!]'),
	]];
});
