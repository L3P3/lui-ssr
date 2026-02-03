// Test node_map with objects with id property
const {
	init,
	node_dom,
	node_map,
} = lui;

const ObjectItem = ({I: obj}) => [
	node_dom('li', {
		innerText: obj.name + ' (id: ' + obj.id + ')',
	}),
];

init(() => {
	const items = [
		{id: 1, name: 'First'},
		{id: 2, name: 'Second'},
		{id: 3, name: 'Third'},
	];
	
	return [
		node_dom('h1[innerText=Node Map with Objects]'),
		node_dom('ul', null, [
			node_map(ObjectItem, items),
		]),
	];
});
