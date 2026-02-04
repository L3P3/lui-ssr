import fs from 'fs';
import path from 'path';

import lui_ssr from '../src/outer.js';

const dir = path.dirname(new URL(import.meta.url).pathname) + '/apps';

let issues = false;

function ssrApp(name) {
	let error = '';
	let created = false;

	// print name without trailing \n
	process.stdout.write(name);

	try {
		const result = lui_ssr(
			fs.readFileSync(`${dir}/${name}.js`, 'utf8')
		)();

		const path_html = `${dir}/${name}.html`;
		if (fs.existsSync(path_html)) {
			if (fs.readFileSync(path_html, 'utf8') !== result) {
				error = 'mismatch';
				issues = true;
			}
		}
		else {
			fs.writeFileSync(path_html, result, 'utf8');
			created = true;
		}
	}
	catch (err) {
		error = err.message;
		issues = true;
	}

	console.log(' ' + (
		created ? '⭐'
		: error ? '❌'
		: '✅'
	));
	if (error && error !== 'mismatch') {
		console.error(error);
	}
}

if (process.argv.length > 2) {
	ssrApp(process.argv[2]);
}
else for (const file of fs.readdirSync(dir)) {
	if (file.endsWith('.js')) ssrApp(file.slice(0, -3));
}

if (issues) {
	console.error('ISSUES FOUND');
	process.exit(1);
}
console.log('No issues found.');
