import * as init from '@core/init';
import { consola } from 'consola';
import { Powervite } from '../src/index';

// Mock dependencies
jest.mock('@core/init', () => ({
  initProject: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('consola', () => ({
  consola: {
    error: jest.fn().mockImplementation(() => undefined),
  },
}));

describe('Powervite CLI should', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create a project when command is "init"', async () => {
    process.argv = ['node', 'script.js', 'init', 'cli-project'];

    await Powervite();

    expect(init.initProject).toHaveBeenCalledTimes(1);
    expect(init.initProject).toHaveBeenCalledWith('cli-project');
  });

  test('show "Command not valid" error if command is not supported', async () => {
    process.argv = ['node', 'script.js', 'unknown'];

    await Powervite();

    expect(consola.error).toHaveBeenCalledWith('Command not valid');
  });
});
