// Test edge cases: empty arrays, false values, null, etc.
const {
	init,
	node_dom,
} = lui;

init(() => [
	node_dom('h1[innerText=Edge Cases Test]'),
	// False value should be skipped
	false,
	// Null should be skipped
	null,
	// True should be skipped
	true,
	// Empty string in innerText
	node_dom('p', {
		innerText: '',
	}),
	// Attribute with value 0
	node_dom('input[type=number]', {
		value: 0,
	}),
	// Boolean attribute set to false (should not appear)
	node_dom('input[type=checkbox]', {
		checked: false,
	}),
	// Boolean attribute set to true (should appear)
	node_dom('input[type=checkbox]', {
		checked: true,
	}),
	// Empty F object
	node_dom('div', {
		F: {},
		innerText: 'No classes',
	}),
	// F with all false values
	node_dom('div', {
		F: {
			class1: false,
			class2: false,
		},
		innerText: 'All classes false',
	}),
	node_dom('p[innerText=End of edge cases]'),
]);
