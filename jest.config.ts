/** @type {import('jest').Config} */

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  transformIgnorePatterns: ['node_modules/(?!(execa)/)'],
  moduleNameMapper: {
    '^@cli/(.*)$': '<rootDir>/src/cli/$1',
    '^@vite/(.*)$': '<rootDir>/src/vite/$1'
  },
};
