// Test innerHTML vs innerText behavior
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=innerHTML vs innerText Test]'),
	node_dom('div', {
		innerText: 'This is plain text with <b>tags</b> escaped',
	}),
	node_dom('div', {
		innerHTML: 'This is HTML with <b>bold text</b>',
	}),
	node_dom('div[innerHTML=Static <i>HTML</i> in descriptor]'),
	node_dom('div[innerText=Static text in descriptor]'),
	// When both are present, innerHTML takes precedence
	node_dom('div', {
		innerText: 'This should not appear',
		innerHTML: 'innerHTML takes precedence',
	}),
]);
