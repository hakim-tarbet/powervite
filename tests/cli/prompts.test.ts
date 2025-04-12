import { promptProjectOptions } from '@cli/prompts';
import prompts from 'prompts';

jest.mock('prompts');

describe('CLI Prompts should', () => {
  const onCancelMock = jest.fn();
  const promptsMock = prompts as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ask if user wants to use TypeScript', async () => {
    await promptProjectOptions(onCancelMock);

    expect(promptsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'confirm',
          name: 'useTypescript',
          message: 'Do you want to use TypeScript?',
          initial: true,
        }),
      ]),
      expect.objectContaining({ onCancel: expect.any(Function) }),
    );
  });

  test('ask the user about styling/theme options', async () => {
    await promptProjectOptions(onCancelMock);

    expect(promptsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'select',
          name: 'style',
          message: 'Choose a styling and/or theme option:',
          choices: [
            { title: 'None (Plain CSS)', value: 'none' },
            { title: 'SCSS / Sass', value: 'scss' },
            { title: 'Styled Components', value: 'styled-components' },
            { title: 'Tailwind CSS', value: 'tailwind' },
            { title: 'Bootstrap UI', value: 'bootstrap' },
            { title: 'Material UI', value: 'material-ui' },
            { title: 'Chakra UI', value: 'chakra-ui' },
            { title: 'Ant Design', value: 'ant-design' },
          ],
          initial: 0,
        }),
      ]),
      expect.objectContaining({ onCancel: expect.any(Function) }),
    );
  });

  test('ask the user about linting option', async () => {
    await promptProjectOptions(onCancelMock);

    expect(promptsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'select',
          name: 'linting',
          message: 'Choose the lint and prettier option:',
          choices: [
            { title: 'None', value: 'none' },
            { title: 'Only ESLint', value: 'eslint' },
            { title: 'Only Prettier', value: 'prettier' },
            { title: 'ESLint + Prettier', value: 'eslint-prettier' },
          ],
          initial: 0,
        }),
      ]),
      expect.objectContaining({ onCancel: expect.any(Function) }),
    );
  });

  test('ask the user about unit testing option', async () => {
    await promptProjectOptions(onCancelMock);

    expect(promptsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'select',
          name: 'testing',
          message: 'Choose the unit testing framework you prefer:',
          choices: [
            { title: 'None', value: 'none' },
            { title: 'Jest', value: 'jest' },
            { title: 'Vitest', value: 'vitest' },
          ],
          initial: 0,
        }),
      ]),
      expect.objectContaining({ onCancel: expect.any(Function) }),
    );
  });

  test('call onCancel when user manually cancels (e.g. Ctrl+C)', async () => {
    promptsMock.mockImplementation(async (_questions, options) => {
      // Simulate manual cancel (Ctrl+C)
      if (options?.onCancel) {
        options.onCancel({ type: 'confirm', name: 'useTypescript' });
      }
      return {};
    });

    await promptProjectOptions(onCancelMock);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test('not call onCancel if it is not cancelled manually', async () => {
    promptsMock.mockImplementation(async (_questions, options) => {
      // Simulate manual cancel (Ctrl+C)
      if (options?.onCancel) {
        options.onCancel(null);
      }
      return {};
    });

    await promptProjectOptions(onCancelMock);

    expect(onCancelMock).not.toHaveBeenCalledTimes(1);
  });

  test('NOT call onCancel if user completes prompts', async () => {
    promptsMock.mockResolvedValueOnce({
      useTypescript: true,
      style: 'tailwind',
    });

    await promptProjectOptions(onCancelMock);

    expect(onCancelMock).not.toHaveBeenCalled();
  });
});
