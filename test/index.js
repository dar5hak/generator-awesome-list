const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const path = require('path');

lab.experiment('generator-awesome-list', () => {
	const props = {
		title: 'Awesome Awesomeness',
		description: 'A curated list of awesomeness',
		username: 'Awesomov Awesomovic',
		email: 'awe@so.me'
	};

	lab.before((done) => {
		helpers.run(path.join(__dirname, '../app'))
			.withPrompts(props);
		done();
	});

	lab.test('all files are created', (done) => {
		assert.file([
			'.gitattributes',
			'code-of-conduct.md',
			'contributing.md',
			'readme.md'
		]);
		done();
	});

	lab.experiment('code-of-conduct.md', () => {
		lab.test('contains email', (done) => {
			assert.fileContent('code-of-conduct.md', props.email);
			done();
		});
	});

	lab.experiment('readme.md', () => {
		lab.test('contains title', (done) => {
			assert.fileContent('readme.md', props.title);
			done();
		});

		lab.test('contains description', (done) => {
			assert.fileContent('readme.md', props.description);
			done();
		});

		lab.test('contains username', (done) => {
			assert.fileContent('readme.md', props.username);
			done();
		});
	});
});
