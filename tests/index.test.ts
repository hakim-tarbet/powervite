import * as inputs from '@cli/inputs';
import * as setup from '@cli/setup';
import { PowerVite, PowerViteInitProject } from '../src/index';

// Mock dependencies
jest.mock('execa', () => ({
  execa: jest.fn(),
}));

describe('PowerVite CLI', () => {
  let questionsSpy: jest.SpyInstance;
  let createViteProjectSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let powerViteInitProjectSpy: jest.SpyInstance;
  let PowerViteModule: () => Promise<void>;

  beforeEach(() => {
    questionsSpy = jest.spyOn(inputs, 'questions');
    createViteProjectSpy = jest.spyOn(setup, 'createViteProject');
    consoleErrorSpy = jest.spyOn(console, 'error');
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    questionsSpy.mockClear();
    createViteProjectSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  describe('Command parser', () => {
    beforeEach(() => {
      jest.resetModules();

      questionsSpy.mockResolvedValue({
        language: 'TypeScript',
      });
    });

    it('should create a project when command is "init"', async () => {
      process.argv = ['node', 'script.js', 'init', 'cli-project'];
  
      await PowerVite();
  
      expect(createViteProjectSpy).toHaveBeenCalledTimes(1);
      expect(createViteProjectSpy).toHaveBeenCalledWith('cli-project', 'react-ts');
    });

    it('should return "Command not valid" error if command is not soported', async () => {
      process.argv = ['node', 'script.js', 'unknown'];

      await PowerVite();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Command not valid');
    });
  });

  describe('Init vite project', () => {
    beforeEach(() => {
      questionsSpy.mockResolvedValue({
        language: 'TypeScript',
      });

      createViteProjectSpy.mockResolvedValue(undefined);
    });

    it('should ask user about project options', async () => {
      await PowerViteInitProject('test-project');
      expect(inputs.questions).toHaveBeenCalledTimes(1);
    });

    it('should create a new project with default name if not indicated', async () => {
      await PowerViteInitProject();

      expect(setup.createViteProject).toHaveBeenCalledTimes(1);
      expect(setup.createViteProject).toHaveBeenCalledWith(
        'my-app',
        'react-ts'
      );
    });

    it('should create a new TypeScript react project if indicated by user', async () => {
      await PowerViteInitProject('test-project');

      expect(setup.createViteProject).toHaveBeenCalledTimes(1);
      expect(setup.createViteProject).toHaveBeenCalledWith(
        'test-project',
        'react-ts'
      );
    });

    it('should create a new JavaScript react project if indicated by user', async () => {
      questionsSpy.mockResolvedValue({
        language: 'JavaScript',
      });

      await PowerViteInitProject('test-project');

      expect(setup.createViteProject).toHaveBeenCalledTimes(1);
      expect(setup.createViteProject).toHaveBeenCalledWith(
        'test-project',
        'react'
      );
    });

    it('should handle errors if project creation fails', async () => {
      createViteProjectSpy.mockRejectedValue(new Error('Failed'));

      await PowerViteInitProject('test-project');

      expect(setup.createViteProject).toHaveBeenCalledTimes(1);
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
});
