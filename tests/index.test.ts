import * as prompts from '@cli/prompts';
import * as vite from '@core/initProject';
import { PowerVite } from '../src/index';

// Mock dependencies
jest.mock('execa', () => ({
  execa: jest.fn(),
}));

describe('PowerVite CLI', () => {
  let questionsSpy: jest.SpyInstance;
  let viteInitProjectSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    questionsSpy = jest.spyOn(prompts, 'askUserChoices').mockRejectedValue(undefined);
    viteInitProjectSpy = jest.spyOn(vite, 'PowerViteInitProject').mockResolvedValue(undefined);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a project when command is "init"', async () => {
    process.argv = ['node', 'script.js', 'init', 'cli-project'];

    await PowerVite();

    expect(viteInitProjectSpy).toHaveBeenCalledTimes(1);
    expect(viteInitProjectSpy).toHaveBeenCalledWith('cli-project');
  });

  it('should return "Command not valid" error if command is not soported', async () => {
    process.argv = ['node', 'script.js', 'unknown'];

    await PowerVite();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Command not valid');
  });
});
