import inquirer from 'inquirer';

export async function questions() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'vite-project',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose your language:',
      choices: ['TypeScript', 'JavaScript'],
    },
  ]);
}
