/* eslint-disable promise/prefer-await-to-then */
'use strict';
const gitConfig = require('git-config');
const Generator = require('yeoman-generator');
const titleCase = require('title-case');

class GeneratorAwesomeList extends Generator {
	initializing() {
		this.props = {};
		this.defaults = {
			title: titleCase(this.appname)
		};
		gitConfig((err, config) => {
			if (!err && config.user) {
				this.defaults.email = config.user.email || null;
			}
		});
	}

	prompting() {
		return this.prompt([{
			type: 'input',
			name: 'title',
			message: 'The name of your awesome list',
			default: this.defaults.title
		}, {
			type: 'input',
			name: 'description',
			message: 'A short description',
			default: 'A curated list of <insert awesome stuff>'
		}, {
			type: 'input',
			name: 'email',
			message: 'Your email',
			default: this.defaults.email,
			store: true
		}]).then(answers => {
			this.props = answers;
		});
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('.gitattributes'),
			this.destinationPath('.gitattributes'),
			{}
		);
		this.fs.copyTpl(
			this.templatePath('code-of-conduct.md'),
			this.destinationPath('code-of-conduct.md'),
			this.props
		);
		this.fs.copyTpl(
			this.templatePath('contributing.md'),
			this.destinationPath('contributing.md'),
			this.props
		);
		this.fs.copyTpl(
			this.templatePath('readme.md'),
			this.destinationPath('readme.md'),
			this.props
		);
	}
}

module.exports = GeneratorAwesomeList;
