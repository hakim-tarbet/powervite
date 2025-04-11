import { askUserChoices } from '@cli/prompts';
import prompts from 'prompts';

jest.mock('prompts');

describe('CLI Prompts should', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ask the user if want to use TypeScript or not', async () => {
    const response = await askUserChoices();

    expect(prompts).toHaveBeenCalledWith({
      type: 'confirm',
      name: 'useTypescript',
      message: 'Do you want to use TypeScript?',
      initial: true,
    });
  });

  test('ask the user about the styling options', async () => {
    const response = await askUserChoices();

    expect(prompts).toHaveBeenCalledWith({
      type: 'select',
      name: 'style',
      message: 'Choose a styling and/or theme option:',
      choices: [
        {title: 'None (Plain CSS)', value: 'none'},
        {title: 'SCSS / Sass', value: 'scss'},
        {title: 'Styled Components', value: 'styled-components'},
        {title: 'Tailwind CSS', value: 'tailwind'},
        {title: 'Bootstrap UI', value: 'bootstrap'},
        {title: 'Material UI', value: 'material-ui'},
        {title: 'Chakra UI', value: 'chakra-ui'},
        {title: 'Ant Design', value: 'ant-design'},
      ],
      initial: 0
    });
  });
});
