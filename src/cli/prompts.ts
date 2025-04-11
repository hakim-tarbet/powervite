import prompts from 'prompts';
import { questions } from './questions';

export const askUserChoices = async (onCancel: () => void) => {
  const response = await prompts(questions, {
    onCancel: (prompt) => {
      if (prompt) {
        onCancel();
        return true;
      }

      return false;
    },
  });

  return response;
};
