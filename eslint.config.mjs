import pluginPrettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import prettierConfig from './.prettierrc.cjs';

export default [
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      'prettier/prettier': ['error', prettierConfig],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
];
