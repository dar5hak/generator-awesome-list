const path = require('path');
const yeomanAssert = require('yeoman-assert');
const helpers = require('yeoman-test');
const awesomeLint = require('awesome-lint');
const test = require('ava');

test.before(async () => {
	await helpers
		.run(path.join(__dirname, 'app'))
		.withPrompts({
			title: 'Awesome Awesomeness',
			description: 'A curated list of awesomeness',
			username: 'Awesomov Awesomovic',
			email: 'awe@so.me'
		});
});

test('creates all files', t => {
	yeomanAssert.file([
		'.gitattributes',
		'code-of-conduct.md',
		'contributing.md',
		'readme.md'
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

test('readme contains username', t => {
	yeomanAssert.fileContent('readme.md', 'Awesomov Awesomovic');
	t.pass();
});

test('complies to awesome-lint', async t => {
	const vfile = await awesomeLint();
	const messages = vfile.messages.filter(msg => msg.ruleId !== 'awesome/git-repo-age');
	t.is(messages.length, 0);
});
