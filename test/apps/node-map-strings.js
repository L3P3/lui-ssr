// Test node_map with strings
const {
	init,
	node_dom,
	node_map,
} = lui;

const StringItem = ({I: str}) => [
	node_dom('li', {
		innerText: str,
	}),
];

init(() => {
	const items = ['apple', 'banana', 'cherry'];
	
	return [
		node_dom('h1[innerText=Node Map with Strings]'),
		node_dom('ul', null, [
			node_map(StringItem, items),
		]),
	];
});
