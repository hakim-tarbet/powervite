import { questions } from '../../src/cli/inputs';
import inquirer from 'inquirer';

// Mock inquirer
jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('CLI Inputs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should ask for project name', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      projectName: 'test-project',
    });

    const answers = await questions();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(answers.projectName).toBe('test-project');
  });

  it('should ask for project langauge', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({
      language: 'TypeScript',
    });

    const answers = await questions();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(answers.language).toBe('TypeScript');
  });
});
