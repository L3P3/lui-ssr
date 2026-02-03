// Test void elements (self-closing tags)
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Void Elements Test]'),
	node_dom('p[innerText=Testing self-closing tags:]'),
	node_dom('br'),
	node_dom('hr'),
	node_dom('img[src=/test.jpg][alt=Test]'),
	node_dom('input[type=text][value=test]'),
	node_dom('meta[name=description][content=Test]'),
	node_dom('link[rel=stylesheet][href=/style.css]'),
	node_dom('br'),
	node_dom('p[innerText=End of void elements]'),
]);
