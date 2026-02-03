// Test deeply nested components
const {
	init,
	node,
	node_dom,
} = lui;

const Level3 = ({text}) => [
	node_dom('span', {
		innerText: text,
		S: {color: 'purple'},
	}),
];

const Level2 = ({text}) => [
	node_dom('div', null, [
		node_dom('b[innerText=Level 2: ]'),
		node(Level3, {text}),
	]),
];

const Level1 = ({text}) => [
	node_dom('div', null, [
		node_dom('b[innerText=Level 1: ]'),
		node(Level2, {text}),
	]),
];

init(() => [
	node_dom('h1[innerText=Deep Nesting Test]'),
	node(Level1, {text: 'Deep Value'}),
]);
