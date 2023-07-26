import lui_ssr from '../src/outer.js';
import fs from 'fs';
import path from 'path';

const dir = path.dirname(new URL(import.meta.url).pathname) + '/apps';

function ssrApp(file) {
	const app = fs.readFileSync(dir + '/' + file, 'utf8');
	const html = lui_ssr(app)();
	
	console.log('result', html);
}

if (process.argv.length > 2) {
	ssrApp(process.argv[2] + '.js');
}
else for (const file of fs.readdirSync(dir)) {
	console.log('file', file);

	ssrApp(file);
	console.log('------------------');
}
