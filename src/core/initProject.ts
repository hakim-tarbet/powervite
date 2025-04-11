import { execa } from 'execa';
import ora from 'ora';
import { consola } from 'consola';
import { printBanner } from '@utils/banner';
import { askUserChoices } from '@cli/prompts';

const initProject = async (projectName: string, template: string) => {
  consola.info(`Running: npm create vite@latest ${projectName} --template ${template}\n`);
  await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', template], { stdio: 'ignore' });
};

const onCancelQuestionHandler = () => {
  consola.error('Questions cancelled');
  process.exit(1);
};

export const PowerViteInitProject = async (name?: string) => {
  printBanner();
  
  // Questions about the project
  const projectName = !name ? 'my-app' : name;
  const { useTypescript } = await askUserChoices(onCancelQuestionHandler);
  const template = useTypescript ? 'react-ts' : 'react';

  const spinner = ora(`Setting up react project with ${useTypescript ? 'TypeScript' : 'Javascript'} in '${projectName}'\n`).start();

  // Create vite react base project
  try {
    await initProject(projectName, template);
    spinner.succeed('Project created successfully!');

    consola.info('Next steps:');
    consola.info(`1.  cd ${projectName}`);
    consola.info('2.  npm install');
    consola.info('3.  npm run dev');
  } catch (error) {
    spinner.fail('Project creation failed please try again.');
    consola.error(error);
  }
};
