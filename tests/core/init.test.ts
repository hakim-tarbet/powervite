import { promptProjectOptions } from '@cli/prompts';
import { initProject } from '@core/init';
import { printBanner } from '@utils/banner';
import { consola } from 'consola';
import { execa } from 'execa';
import ora from 'ora';

jest.mock('execa', () => ({
  execa: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }));
});

jest.mock('consola', () => ({
  consola: {
    error: jest.fn().mockImplementation(() => undefined),
    log: jest.fn().mockImplementation(() => undefined),
    info: jest.fn().mockImplementation(() => undefined),
  },
}));

jest.mock('@cli/prompts', () => ({
  promptProjectOptions: jest.fn().mockResolvedValue({
    useTypescript: true,
  })
}));

jest.mock('@utils/banner', () => ({
  printBanner: jest.fn().mockResolvedValue(undefined)
}));

describe('Vite init project should', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('print the welcome banner', async () => {
    await initProject('test-project');

    expect(printBanner).toHaveBeenCalledTimes(1);
  });

  test('ask the user about project settings', async () =>  {
    await initProject('test-project');
    
    expect(promptProjectOptions).toHaveBeenCalledTimes(1);
  });

  test('create a TypeScript React project with the indicated project name', async () => {
    await initProject('test-project');

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith('npm', [
      'create',
      'vite@latest',
      'test-project',
      '--',
      '--template',
      'react-ts',
    ], { stdio: 'ignore' });
  });

  test('create a TypeScript React project with default project name if not indicated', async () => {
    await initProject();

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith('npm', [
      'create',
      'vite@latest',
      'my-app',
      '--',
      '--template',
      'react-ts',
    ], { stdio: 'ignore' });
  });

  test('create a JavaScript React project if indicated by selected by user', async () => {
    (promptProjectOptions as jest.Mock).mockResolvedValue({
      useTs: false
    })

    await initProject();

    expect(execa).toHaveBeenCalledTimes(1);
    expect(execa).toHaveBeenCalledWith('npm', [
      'create',
      'vite@latest',
      'my-app',
      '--',
      '--template',
      'react',
    ], { stdio: 'ignore' });
  });

  test('Show the success create project messages and steps', async () => {
    await initProject('test-project');

    const oraMock = ora as jest.Mock;
    const spinnerInstance = oraMock.mock.results[0].value;

    expect(spinnerInstance.succeed).toHaveBeenCalledWith('Project created successfully!');
    
    expect(consola.info).toHaveBeenCalledWith('Next steps:');
    expect(consola.info).toHaveBeenCalledWith('1.  cd test-project');
    expect(consola.info).toHaveBeenCalledWith('2.  npm run dev');
  });

  test('throw an error if project creation fails', async () => {
    (execa as jest.Mock).mockRejectedValue(new Error('Failed'));

    await initProject('test-project');

    const oraMock = ora as jest.Mock;
    const spinnerInstance = oraMock.mock.results[0].value;

    expect(spinnerInstance.fail).toHaveBeenCalledWith('Project creation failed. Please try again.');
    expect(consola.error).toHaveBeenCalledWith(expect.any(Error));
  });
  
  test('handle prompt cancellation by logging error and exiting process', async () => {
    // Override the promptProjectOptions to immediately trigger the cancellation callback.
    (promptProjectOptions as jest.Mock).mockImplementation(
      (onCancel: () => void) => {
        onCancel();
        return Promise.resolve({});
      }
    );

    // Spy on process.exit and override it to throw an error so we can catch it.
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation((code?: number) => {
      throw new Error(`process.exit: ${code}`);
    });

    await expect(initProject('test-project')).rejects.toThrow('process.exit: 1');

    expect(consola.error).toHaveBeenCalledWith('Questions cancelled');
    
    exitSpy.mockRestore();
  });
});