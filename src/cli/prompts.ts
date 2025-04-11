import prompts from 'prompts';
import { questions } from './questions';

/**
 * Prompts the user for project options using a series of questions.
 *
 * This function uses the `prompts` package to ask the user a set of
 * questions defined in the imported `questions` module.
 * 
 * If the user cancels any prompt, the provided onCancel callback is
 * invoked to handle the cancellation, and the prompt session is terminated.
 *
 * @param onCancel - A callback function that is executed if the prompt is canceled.
 *                   This allows for custom handling of cancellation scenarios (logging and
 *                   exiting the process).
 * @returns A promise that resolves to an object containing the user's responses.
 */
export const promptProjectOptions = async (onCancel: () => void) => {
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
