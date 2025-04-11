import prompts from 'prompts';

export const askUserChoices = async () => {
  const response = await prompts({
    type: 'confirm',
    name: 'useTypescript',
    message: 'Do you want to use TypeScript?',
    initial: true
  });

  return response;
};
