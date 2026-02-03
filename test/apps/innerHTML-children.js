// Test innerHTML with children (children appear AFTER innerHTML/innerText content)
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=innerHTML with Children Test]'),
	node_dom('div', {
		innerHTML: 'This is innerHTML',
	}, [
		node_dom('p[innerText=This child appears after innerHTML]'),
	]),
	node_dom('div', {
		innerText: 'This is innerText',
	}, [
		node_dom('p[innerText=This child appears after innerText]'),
	]),
	node_dom('div', null, [
		node_dom('p[innerText=This child appears normally]'),
	]),
]);
