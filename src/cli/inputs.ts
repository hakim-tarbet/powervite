import inquirer from 'inquirer';

export async function questions() {
  return inquirer.prompt([{
    type: 'list',
    name: 'language',
    message: 'Choose your language:',
    choices: ['TypeScript', 'JavaScript'],
  }]);
}
