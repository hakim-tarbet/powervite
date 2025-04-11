import { PromptObject } from 'prompts';

export const questions: PromptObject[] = [
    {
        type: 'confirm',
        name: 'useTypescript',
        message: 'Do you want to use TypeScript?',
        initial: true
    },
    {
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
    },
    {
        type: 'select',
        name: 'linting',
        message: 'Choose the lint and prettier option:',
        choices: [
          {title: 'None', value: 'none'},
          {title: 'Only ESLint', value: 'eslint'},
          {title: 'Only Prettier', value: 'prettier'},
          {title: 'ESLint + Prettier', value: 'eslint-prettier'},
        ],
        initial: 0,
    },
    {
        type: 'select',
        name: 'testing',
        message: 'Choose the unit testing framework you prefer:',
        choices: [
          {title: 'None', value: 'none'},
          {title: 'Jest', value: 'jest'},
          {title: 'Vitest', value: 'vitest'},
        ],
        initial: 0,
    },
];