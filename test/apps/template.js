// This is copied 1:1 from the lui repository, import replaced with const.

const {
	dom_define,
	init,
	node_dom,
} = lui;

// define a template
dom_define('test', 'h1[innerText=Hello, world!]', {
	S: {
		color: 'red',
	},
});

// you can extend templates!
dom_define('test2', '#test', {
	S: {
		textAlign: 'center',
	},
	D: {
		bla: 'bla',
	},
});

init(() => {
	return [null, [
		// use a template
		node_dom('#test', {
			S: {
				textDecoration: 'underline',
			},
		}),
		node_dom('#test2', {
			S: {
				textDecoration: 'underline',
			},
		}),
	]];
});
