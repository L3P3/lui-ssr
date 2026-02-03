// Test innerHTML with children (innerHTML should take precedence)
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=innerHTML with Children Test]'),
	node_dom('div', {
		innerHTML: 'This is innerHTML',
	}, [
		node_dom('p[innerText=This child should not appear]'),
	]),
	node_dom('div', {
		innerText: 'This is innerText',
	}, [
		node_dom('p[innerText=This child should not appear either]'),
	]),
	node_dom('div', null, [
		node_dom('p[innerText=This child should appear]'),
	]),
]);
