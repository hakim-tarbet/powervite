import { askUserChoices } from '@cli/prompts';
import prompts from 'prompts';

jest.mock('prompts');

describe('CLI Prompts should', () => {
  const promptsMock = prompts as jest.Mock;

  afterEach(() => {
    promptsMock.mockClear();
  });

  test('should ask the user if they want to use TypeScript', async () => {
    promptsMock.mockResolvedValue({ useTypescript: true });

    const answers = await askUserChoices();

    expect(promptsMock).toHaveBeenCalledTimes(1);
    expect(answers.useTypescript).toBe(true);
  });
});
