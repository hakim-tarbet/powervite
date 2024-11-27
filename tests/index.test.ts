import * as inputs from '../src/cli/inputs';
import * as setup from '../src/cli/setup';
import { PowerVite } from '../src/index';

// Mock dependencies
jest.mock('execa', () => ({
  execa: jest.fn(),
}));

jest.mock('../src/cli/inputs', () => ({
  questions: jest.fn().mockResolvedValue({
    projectName: 'test-project',
    language: 'TypeScript',
  }),
}));

jest.mock('../src/cli/setup');

describe('PowerVite CLI function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should ask questions to user about the project', async () => {
    jest.spyOn(inputs, 'questions').mockResolvedValue({
      projectName: 'test-project',
      language: 'TypeScript',
    });

    jest.spyOn(setup, 'createViteProject').mockResolvedValue(undefined);

    await PowerVite();

    expect(inputs.questions).toHaveBeenCalledTimes(1);
  });

  it('should create vite react project with TypeScript', async () => {
    jest.spyOn(inputs, 'questions').mockResolvedValue({
      projectName: 'test-project',
      language: 'TypeScript',
    });

    jest.spyOn(setup, 'createViteProject').mockResolvedValue(undefined);

    await PowerVite();

    expect(setup.createViteProject).toHaveBeenCalledTimes(1);
    expect(setup.createViteProject).toHaveBeenCalledWith(
      'test-project',
      'react-ts'
    );
  });

  it('should create vite react project with JavaScript', async () => {
    jest.spyOn(inputs, 'questions').mockResolvedValue({
      projectName: 'test-project',
      language: 'JavaScript',
    });

    jest.spyOn(setup, 'createViteProject').mockResolvedValue(undefined);

    await PowerVite();

    expect(setup.createViteProject).toHaveBeenCalledTimes(1);
    expect(setup.createViteProject).toHaveBeenCalledWith(
      'test-project',
      'react'
    );
  });

  it('should handle errors if project could not be created', async () => {
    jest.spyOn(inputs, 'questions').mockResolvedValue({
      projectName: 'test-project',
      language: 'TypeScript',
    });

    jest
      .spyOn(setup, 'createViteProject')
      .mockRejectedValue(new Error('Failed'));

    console.error = jest.fn();

    await PowerVite();

    expect(setup.createViteProject).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Failed creating the project:',
      expect.any(Error)
    );
  });
});
