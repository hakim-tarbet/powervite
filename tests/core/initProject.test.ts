import { initProject, PowerViteInitProject } from '@core/initProject';
import * as prompts from '@cli/prompts';
import * as vite from '@core/initProject';
import { execa } from 'execa';

// Mock execa
jest.mock('execa', () => ({
  execa: jest.fn(),
}));

describe('Vite init project', () => {
  it('should create a project using execa', async () => {
    (execa as jest.Mock).mockResolvedValue({});

    await initProject('test-project', 'react-ts');

    expect(execa).toHaveBeenCalledWith('npm', [
      'create',
      'vite@latest',
      'test-project',
      '--',
      '--template',
      'react-ts',
    ], { stdio: 'ignore' });
  });

  it('should throw an error if project creation fails', async () => {
    (execa as jest.Mock).mockRejectedValue(new Error('Failed'));

    await expect(initProject('test-project', 'react-ts')).rejects.toThrow('Failed');
  });
});

describe('Init vite project', () => {
  let questionsSpy: jest.SpyInstance;
  let viteInitProjectSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    viteInitProjectSpy = jest.spyOn(vite, 'initProject');
    questionsSpy = jest.spyOn(prompts, 'askUserChoices').mockResolvedValue({
      language: 'TypeScript',
    });

    viteInitProjectSpy.mockResolvedValue(undefined);
  });

  afterEach(() => {
    questionsSpy.mockClear();
    viteInitProjectSpy.mockClear();
    consoleErrorSpy.mockClear();
    consoleLogSpy.mockClear();
  });

  it('should ask user about project options', async () => {
    await PowerViteInitProject('test-project');
    expect(prompts.askUserChoices).toHaveBeenCalledTimes(1);
  });

  it('should create a new project with default name if not indicated', async () => {
    await PowerViteInitProject();

    expect(vite.initProject).toHaveBeenCalledTimes(1);
    expect(vite.initProject).toHaveBeenCalledWith(
      'my-app',
      'react-ts'
    );
  });

  it('should create a new TypeScript react project if indicated by user', async () => {
    await PowerViteInitProject('test-project');

    expect(vite.initProject).toHaveBeenCalledTimes(1);
    expect(vite.initProject).toHaveBeenCalledWith(
      'test-project',
      'react-ts'
    );
  });

  it('should create a new JavaScript react project if indicated by user', async () => {
    questionsSpy.mockResolvedValue({
      language: 'JavaScript',
    });

    await PowerViteInitProject('test-project');

    expect(vite.initProject).toHaveBeenCalledTimes(1);
    expect(vite.initProject).toHaveBeenCalledWith(
      'test-project',
      'react'
    );
  });

  it('should handle errors if project creation fails', async () => {
    viteInitProjectSpy.mockRejectedValue(new Error('Failed'));

    await PowerViteInitProject('test-project');

    expect(vite.initProject).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed creating the project:',
      expect.any(Error)
    );
  });

  it('should show project creation logs in terminal', async () => {
    await PowerViteInitProject('react-test-project');
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Welcome to PowerVite! Let’s bootstrap your project."
    );
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Creating your react project named 'react-test-project' in 'TypeScript'..."
    );

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Project 'react-test-project' created successfully!"
    );
  });
});