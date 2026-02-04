import lui_ssr from '../src/outer.js';
import fs from 'fs';

console.log('Testing sandbox timeout protection...');

// Test 1: Infinite loop should timeout
try {
	const maliciousApp = `
		const {init, node_dom} = lui;
		init(() => {
			while(true) {
				// infinite loop
			}
			return [
				node_dom('h1[innerText=This should never render]'),
			];
		});
	`;
	const render = lui_ssr(maliciousApp);
	render(); // Should throw timeout error
	console.error('❌ FAIL: Infinite loop did not timeout');
	process.exit(1);
} catch (error) {
	if (error.message.includes('timeout') || error.message.includes('timed out')) {
		console.log('✓ Infinite loop caught by timeout');
	} else {
		console.error('❌ FAIL: Wrong error:', error.message);
		process.exit(1);
	}
}

// Test 2: Normal app should work fine
try {
	const app = fs.readFileSync('./test/apps/helloworld.js', 'utf8');
	const html = lui_ssr(app)();
	if (html === '<h1>Hello, World!</h1>') {
		console.log('✓ Normal app still works');
	} else {
		console.error('❌ FAIL: Normal app output incorrect');
		process.exit(1);
	}
} catch (error) {
	console.error('❌ FAIL: Normal app threw error:', error.message);
	process.exit(1);
}

// Test 3: Try to access process (should be isolated)
try {
	const maliciousApp = `
		const {init, node_dom} = lui;
		init(() => {
			// Try to access Node.js globals (should not work in sandbox)
			const hasProcess = typeof process !== 'undefined';
			return [
				node_dom('h1', {innerText: hasProcess ? 'UNSAFE' : 'Safe'})
			];
		});
	`;
	const html = lui_ssr(maliciousApp)();
	if (html.includes('Safe')) {
		console.log('✓ Node.js globals are isolated');
	} else {
		console.error('❌ FAIL: Node.js process is accessible');
		process.exit(1);
	}
} catch (error) {
	console.error('❌ FAIL: Isolation test failed:', error.message);
	process.exit(1);
}

// Test 4: Browser globals should be available
try {
	const browserApp = `
		const {init, node_dom} = lui;
		init(() => {
			const ua = navigator.userAgent;
			return [
				node_dom('h1', {innerText: ua})
			];
		});
	`;
	const html = lui_ssr(browserApp)();
	if (html.includes('lui-ssr')) {
		console.log('✓ Browser globals are available');
	} else {
		console.error('❌ FAIL: Browser globals not working');
		process.exit(1);
	}
} catch (error) {
	console.error('❌ FAIL: Browser globals test failed:', error.message);
	process.exit(1);
}

console.log('\n✅ All sandbox tests passed!');
