import { questions } from '../../src/cli/inputs';
import inquirer from 'inquirer';

// Mock inquirer
jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('CLI Inputs', () => {
  let inquirerMock: jest.Mock;

  beforeEach(() => {
    inquirerMock = (inquirer.prompt as unknown as jest.Mock)
  });

  afterAll(() => {
    inquirerMock.mockClear();
  });

  it('should ask for project langauge', async () => {
    inquirerMock.mockResolvedValue({
      language: 'TypeScript',
    });

    const answers = await questions();

    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    expect(answers.language).toBe('TypeScript');
  });
});
