import { initProject } from '@vite/initProject';
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
