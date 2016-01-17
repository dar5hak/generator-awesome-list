const gitConfig = require('git-config');
const generators = require('yeoman-generator');
const titleCase = require('title-case');

module.exports = generators.Base.extend({
	initializing: function () {
		this.props = {};
		this.defaults = {
			title: titleCase(this.appname)
		};
		gitConfig((err, config) => {
			if (!err && config.user) {
				this.defaults.username = config.user.name || null;
				this.defaults.email = config.user.email || null;
			}
		});
	},
	prompting: {
		title: function () {
			const done = this.async();
			this.prompt({
				name: 'title',
				message: 'The name of your awesome list',
				default: this.defaults.title
			}, answer => {
				this.props.title = answer.title;
				done();
			});
		},
		description: function () {
			const done = this.async();
			this.prompt({
				name: 'description',
				message: 'A short description'
			}, answer => {
				this.props.description = answer.description;
				done();
			});
		},
		username: function () {
			const done = this.async();
			this.prompt({
				name: 'username',
				message: 'Your name',
				default: this.defaults.username,
				store: true
			}, answer => {
				this.props.username = answer.username;
				done();
			});
		},
		email: function () {
			const done = this.async();
			this.prompt({
				name: 'email',
				message: 'Your email',
				default: this.defaults.email,
				store: true
			}, answer => {
				this.props.email = answer.email;
				done();
			});
		}
	},
	writing: function () {
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
});
