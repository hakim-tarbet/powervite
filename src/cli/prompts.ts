import inquirer from 'inquirer';

export async function askUserChoices() {
  return inquirer.prompt([{
    type: 'list',
    name: 'language',
    message: 'Choose your language:',
    choices: ['TypeScript', 'JavaScript'],
  }]);
}
