// Test empty node_map
const {
	init,
	node_dom,
	node_map,
} = lui;

const Item = ({I: item}) => [
	node_dom('li', {innerText: item}),
];

init(() => [
	node_dom('h1[innerText=Empty Node Map Test]'),
	node_dom('ul', null, [
		node_map(Item, []),
	]),
	node_dom('p[innerText=The list above is empty]'),
]);
