// Test that browser globals are available in the sandbox
const {
	init,
	node_dom,
} = lui;

init(() => {
	// Test all the new browser globals
	const hasImage = typeof Image !== 'undefined';
	const hasAddEventListener = typeof addEventListener !== 'undefined';
	const hasRemoveEventListener = typeof removeEventListener !== 'undefined';
	const hasAlert = typeof alert !== 'undefined';
	const hasConfirm = typeof confirm !== 'undefined';
	const hasPrompt = typeof prompt !== 'undefined';
	const hasClose = typeof close !== 'undefined';
	const hasLocationReload = typeof location !== 'undefined' && typeof location.reload !== 'undefined';
	
	// Try calling them to make sure they don't throw
	addEventListener('click', () => {});
	removeEventListener('click', () => {});
	alert('test');
	const confirmResult = confirm('test');
	const promptResult = prompt('test');
	close();
	location.reload();
	
	return [
		node_dom('h1[innerText=Browser Globals Test]'),
		node_dom('p', {innerText: `Image: ${hasImage}`}),
		node_dom('p', {innerText: `addEventListener: ${hasAddEventListener}`}),
		node_dom('p', {innerText: `removeEventListener: ${hasRemoveEventListener}`}),
		node_dom('p', {innerText: `alert: ${hasAlert}`}),
		node_dom('p', {innerText: `confirm: ${hasConfirm} (returns: ${confirmResult})`}),
		node_dom('p', {innerText: `prompt: ${hasPrompt} (returns: ${promptResult})`}),
		node_dom('p', {innerText: `close: ${hasClose}`}),
		node_dom('p', {innerText: `location.reload: ${hasLocationReload}`}),
	];
});
