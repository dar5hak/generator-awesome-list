import path from 'node:path';
import {fileURLToPath} from 'node:url';
import yeomanAssert from 'yeoman-assert';
import helpers from 'yeoman-test';
import awesomeLint from 'awesome-lint';
import test from 'ava';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.before(async () => {
	await helpers
		.run(path.join(__dirname, 'app'))
		.withPrompts({
			title: 'Awesome Awesomeness',
			description: 'A curated list of awesomeness',
			username: 'Awesomov Awesomovic',
			email: 'awe@so.me',
		});
});

test('creates all files', t => {
	yeomanAssert.file([
		'.gitattributes',
		'code-of-conduct.md',
		'contributing.md',
		'readme.md',
	]);
	t.pass();
});

test('code of conduct contains email', t => {
	yeomanAssert.fileContent('code-of-conduct.md', 'awe@so.me');
	t.pass();
});

test('readme contains title', t => {
	yeomanAssert.fileContent('readme.md', 'Awesome Awesomeness');
	t.pass();
});

test('readme contains description', t => {
	yeomanAssert.fileContent('readme.md', 'A curated list of awesomeness');
	t.pass();
});

test('complies to awesome-lint', async t => {
	const vfiles = await awesomeLint({filename: 'readme.md'});
	const messages = vfiles
		.flatMap(vfile => vfile.messages)
		.filter(message => message.ruleId !== 'awesome-git-repo-age' && message.ruleId !== 'awesome-github' && message.ruleId !== 'double-link');
	t.is(messages.length, 0);
});
