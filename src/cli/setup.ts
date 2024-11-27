import { execa } from 'execa';

export async function createViteProject(projectName: string, template: string) {
  try {
    await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', template], { stdio: 'ignore' });
  } catch (error) {
    throw error;
  }
}