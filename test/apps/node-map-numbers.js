// Test node_map with numbers
const {
	init,
	node_dom,
	node_map,
} = lui;

const NumberItem = ({I: num}) => [
	node_dom('li', {
		innerText: 'Number: ' + num,
	}),
];

init(() => {
	const numbers = [1, 2, 3];
	
	return [
		node_dom('h1[innerText=Node Map with Numbers]'),
		node_dom('ul', null, [
			node_map(NumberItem, numbers),
		]),
	];
});
