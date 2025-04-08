import inquirer from 'inquirer';

export const askUserChoices = async () => {
  return inquirer.prompt([{
    type: 'list',
    name: 'language',
    message: 'Choose your language:',
    choices: ['TypeScript', 'JavaScript'],
  }]);
};
