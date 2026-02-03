// Test hook_assert for conditional rendering
const {
	hook_assert,
	init,
	node,
	node_dom,
} = lui;

const ConditionalComponent = ({show}) => {
	hook_assert(show);
	return [
		node_dom('p[innerText=This should only show when show=true]'),
	];
};

init(() => [
	node_dom('h1[innerText=Hook Assert Test]'),
	node(ConditionalComponent, {show: true}),
	node(ConditionalComponent, {show: false}),
	node_dom('p[innerText=End of test]'),
]);
