// Test that infinite loops are caught by timeout
const {
	init,
	node_dom,
} = lui;

init(() => {
	// This would freeze the server without timeout protection
	while(true) {
		// infinite loop
	}
	
	return [
		node_dom('h1[innerText=This should never render]'),
	];
});
