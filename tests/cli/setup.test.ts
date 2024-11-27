import { createViteProject } from '../../src/cli/setup';
import { execa } from 'execa';

// Mock execa
jest.mock('execa', () => ({
  execa: jest.fn(),
}));

describe('CLI Setup', () => {
  it('should create a project using execa', async () => {
    (execa as jest.Mock).mockResolvedValue({});

    await createViteProject('test-project', 'react-ts');

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

    await expect(createViteProject('test-project', 'react-ts')).rejects.toThrow('Failed');
  });
});
