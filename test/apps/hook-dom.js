// Test hook_dom for wrapping components
const {
	hook_dom,
	init,
	node,
	node_dom,
} = lui;

const WrappedComponent = ({text}) => {
	hook_dom('section', {
		S: {
			border: '1px solid black',
			padding: '10px',
		},
	});
	
	return [
		node_dom('h2[innerText=Wrapped Title]'),
		node_dom('p', {
			innerText: text,
		}),
	];
};

init(() => [
	node_dom('h1[innerText=Hook Dom Test]'),
	node(WrappedComponent, {
		text: 'This component is wrapped in a section',
	}),
]);
