// Test node_map with additional props
const {
	init,
	node_dom,
	node_map,
} = lui;

const Item = ({I: item, prefix}) => [
	node_dom('li', {
		innerText: prefix + item,
	}),
];

init(() => {
	const items = ['one', 'two', 'three'];
	
	return [
		node_dom('h1[innerText=Node Map with Props]'),
		node_dom('ul', null, [
			node_map(Item, items, {prefix: 'Item: '}),
		]),
	];
});
