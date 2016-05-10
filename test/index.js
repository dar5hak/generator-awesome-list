const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

lab.before(done => {
	helpers.run(path.join(__dirname, '../app'))
		.withPrompts({
			title: 'Awesome Awesomeness',
			description: 'A curated list of awesomeness',
			username: 'Awesomov Awesomovic',
			email: 'awe@so.me'
		})
		.on('end', done);
});

lab.test('all files are created', done => {
	assert.file([
		'.gitattributes',
		'code-of-conduct.md',
		'contributing.md',
		'readme.md'
	]);
	done();
});

lab.experiment('code-of-conduct.md', () => {
	lab.test('contains email', done => {
		assert.fileContent('code-of-conduct.md', 'awe@so.me');
		done();
	});
});

lab.experiment('readme.md', () => {
	lab.test('contains title', done => {
		assert.fileContent('readme.md', 'Awesome Awesomeness');
		done();
	});

	lab.test('contains description', done => {
		assert.fileContent('readme.md', 'A curated list of awesomeness');
		done();
	});

	lab.test('contains username', done => {
		assert.fileContent('readme.md', 'Awesomov Awesomovic');
		done();
	});
});
