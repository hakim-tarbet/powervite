import * as vite from '@core/initProject';
import { consola } from 'consola';
import { PowerVite } from '../src/index';

// Mock dependencies
jest.mock('@core/initProject', () => ({
  PowerViteInitProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('consola', () => ({
  consola: {
    error: jest.fn().mockImplementation(() => undefined),
  },
}));

describe('PowerVite CLI should', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create a project when command is "init"', async () => {
    process.argv = ['node', 'script.js', 'init', 'cli-project'];

    await PowerVite();

    expect(vite.PowerViteInitProject).toHaveBeenCalledTimes(1);
    expect(vite.PowerViteInitProject).toHaveBeenCalledWith('cli-project');
  });

  test('show "Command not valid" error if command is not supported', async () => {
    process.argv = ['node', 'script.js', 'unknown'];

    await PowerVite();

    expect(consola.error).toHaveBeenCalledWith('Command not valid');
  });
});
