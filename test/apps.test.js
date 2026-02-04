import lui_ssr from '../src/outer.js';
import fs from 'fs';
import path from 'path';

const dir = path.dirname(new URL(import.meta.url).pathname) + '/apps';

const mismatches = [];

function ssrApp(file) {
	const testName = file.replace(/\.js$/, '');
	let error = null;
	let created = false;
	
	try {
		const app = fs.readFileSync(dir + '/' + file, 'utf8');
		const html = lui_ssr(app)();
		
		const htmlFile = file.replace(/\.js$/, '.html');
		const htmlPath = dir + '/' + htmlFile;
		
		// Check if .html file exists
		if (fs.existsSync(htmlPath)) {
			// Compare with expected output
			const expected = fs.readFileSync(htmlPath, 'utf8').trim();
			if (html !== expected) {
				error = `Output does not match ${htmlFile}`;
				mismatches.push({
					file,
					expected,
					actual: html
				});
			}
		} else {
			// Auto-save the output
			fs.writeFileSync(htmlPath, html, 'utf8');
			created = true;
		}
	} catch (err) {
		error = err.message;
	}
	
	// Single console.log per test with emoji
	console.log(testName, created ? '⭐' : error ? '❌' : '✅');
	if (error) {
		console.log(error);
	}
}

if (process.argv.length > 2) {
	ssrApp(process.argv[2] + '.js');
}
else for (const file of fs.readdirSync(dir)) {
	if (!file.endsWith('.js')) continue;
	ssrApp(file);
}

// Report mismatches at the end
if (mismatches.length > 0) {
	console.error('\n❌ MISMATCHES FOUND:\n');
	for (const mismatch of mismatches) {
		console.error(`File: ${mismatch.file}`);
		console.error(`Expected: ${mismatch.expected}`);
		console.error(`Actual:   ${mismatch.actual}`);
		console.error('');
	}
	process.exit(1);
}
