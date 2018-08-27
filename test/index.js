const path = require('path');
const nodeAssert = require('assert');
const yeomanAssert = require('yeoman-assert');
const helpers = require('yeoman-test');
const awesomeLint = require('awesome-lint');
const Lab = require('lab');

const lab = Lab.script();
exports.lab = lab;

lab.before(() => {
	return new Promise(resolve => {
		helpers
			.run(path.join(__dirname, '../app'))
			.withPrompts({
				title: 'Awesome Awesomeness',
				description: 'A curated list of awesomeness',
				username: 'Awesomov Awesomovic',
				email: 'awe@so.me'
			})
			.on('end', resolve);
	});
});

lab.test('all files are created', () => {
	return new Promise(resolve => {
		yeomanAssert.file([
			'.gitattributes',
			'code-of-conduct.md',
			'contributing.md',
			'readme.md'
		]);
		resolve();
	});
});

lab.experiment('code-of-conduct.md', () => {
	lab.test('contains email', () => {
		return new Promise(resolve => {
			yeomanAssert.fileContent('code-of-conduct.md', 'awe@so.me');
			resolve();
		});
	});
});

lab.experiment('readme.md', () => {
	lab.test('contains title', () => {
		return new Promise(resolve => {
			yeomanAssert.fileContent('readme.md', 'Awesome Awesomeness');
			resolve();
		});
	});

	lab.test('contains description', () => {
		return new Promise(resolve => {
			yeomanAssert.fileContent('readme.md', 'A curated list of awesomeness');
			resolve();
		});
	});

	lab.test('contains username', () => {
		return new Promise(resolve => {
			yeomanAssert.fileContent('readme.md', 'Awesomov Awesomovic');
			resolve();
		});
	});
});

lab.test('lint', () => {
	return awesomeLint().then(vfile => {
		const messages = vfile.messages.filter(msg => msg.ruleId !== 'awesome/git-repo-age');
		nodeAssert.strictEqual(messages.length, 0);
	});
});
