// Test nested components with props passing
const {
	init,
	node,
	node_dom,
} = lui;

const InnerComponent = ({text, color}) => [
	node_dom('span', {
		S: {color},
		innerText: text,
	}),
];

const MiddleComponent = ({prefix, suffix}) => [
	node_dom('div', null, [
		node(InnerComponent, {
			text: prefix,
			color: 'blue',
		}),
		node_dom('span[innerText= - ]'),
		node(InnerComponent, {
			text: suffix,
			color: 'red',
		}),
	]),
];

init(() => [
	node_dom('h1[innerText=Nested Components Test]'),
	node(MiddleComponent, {
		prefix: 'Hello',
		suffix: 'World',
	}),
]);
