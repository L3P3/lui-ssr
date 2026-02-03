// Test complex real-world component structure
const {
	hook_state,
	hook_memo,
	init,
	node,
	node_dom,
	node_map,
} = lui;

const Header = ({title}) => [
	node_dom('header', {
		S: {
			backgroundColor: '#333',
			color: 'white',
			padding: '20px',
		},
	}, [
		node_dom('h1', {innerText: title}),
	]),
];

const ListItem = ({I: item}) => [
	node_dom('li', {
		S: {
			padding: '5px',
			borderBottom: '1px solid #ddd',
		},
		innerText: item.name + ' - $' + item.price,
	}),
];

const Footer = ({year}) => [
	node_dom('footer', {
		S: {
			marginTop: '20px',
			padding: '10px',
			backgroundColor: '#f0f0f0',
		},
	}, [
		node_dom('p', {
			innerText: '© ' + year + ' Test Company',
		}),
	]),
];

init(() => {
	const [items] = hook_state([
		{id: 1, name: 'Product A', price: 29.99},
		{id: 2, name: 'Product B', price: 39.99},
		{id: 3, name: 'Product C', price: 19.99},
	]);
	
	const total = hook_memo(
		(items) => items.reduce((sum, item) => sum + item.price, 0).toFixed(2),
		[items]
	);
	
	return [
		node(Header, {title: 'Product Catalog'}),
		node_dom('main', {
			S: {
				padding: '20px',
			},
		}, [
			node_dom('ul', {
				S: {
					listStyle: 'none',
					padding: '0',
				},
			}, [
				node_map(ListItem, items),
			]),
			node_dom('div', {
				S: {
					marginTop: '20px',
					fontWeight: 'bold',
				},
				innerText: 'Total: $' + total,
			}),
		]),
		node(Footer, {year: 2024}),
	];
});
