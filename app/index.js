import gitConfig from 'git-config';
import Generator from 'yeoman-generator';
import {titleCase} from 'title-case';

class GeneratorAwesomeList extends Generator {
	initializing() {
		this.props = {};
		this.defaults = {
			title: titleCase(this.appname),
		};
		gitConfig((error, config) => {
			if (!error && config.user) {
				this.defaults.email = config.user.email || null;
			}
		});
	}

	async prompting() {
		this.props = await this.prompt([{
			type: 'input',
			name: 'title',
			message: 'The name of your awesome list',
			default: this.defaults.title,
		}, {
			type: 'input',
			name: 'description',
			message: 'A short description',
			default: 'A curated list of <insert awesome stuff>',
		}, {
			type: 'input',
			name: 'email',
			message: 'Your email',
			default: this.defaults.email,
			store: true,
		}]);
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('.gitattributes'),
			this.destinationPath('.gitattributes'),
			{},
		);
		this.fs.copyTpl(
			this.templatePath('code-of-conduct.md'),
			this.destinationPath('code-of-conduct.md'),
			this.props,
		);
		this.fs.copyTpl(
			this.templatePath('contributing.md'),
			this.destinationPath('contributing.md'),
			this.props,
		);
		this.fs.copyTpl(
			this.templatePath('readme.md'),
			this.destinationPath('readme.md'),
			this.props,
		);
	}
}

export default GeneratorAwesomeList;
