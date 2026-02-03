// Test mixed content (text nodes and elements)
const {
	init,
	node,
	node_dom,
} = lui;

const InlineComponent = () => [
	node_dom('strong[innerText=bold]'),
];

init(() => [
	node_dom('h1[innerText=Mixed Content Test]'),
	node_dom('p', null, [
		node_dom('span[innerText=Start ]'),
		node(InlineComponent),
		node_dom('span[innerText= middle ]'),
		node_dom('em[innerText=italic]'),
		node_dom('span[innerText= end]'),
	]),
]);
