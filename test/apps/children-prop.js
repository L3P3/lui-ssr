// Test children prop in components
const {
	init,
	node,
	node_dom,
} = lui;

const Container = ({children, title}) => [
	node_dom('div', {
		S: {
			border: '2px solid green',
			padding: '10px',
		},
	}, [
		node_dom('h3', {innerText: title}),
		...children,
	]),
];

init(() => [
	node_dom('h1[innerText=Children Prop Test]'),
	node(Container, {
		title: 'Container 1',
	}, [
		node_dom('p[innerText=First child]'),
		node_dom('p[innerText=Second child]'),
	]),
	node(Container, {
		title: 'Container 2',
	}, [
		node_dom('span[innerText=Single child]'),
	]),
]);
