import { askUserChoices } from '@cli/prompts';
import { execa } from 'execa';

export const initProject = async (projectName: string, template: string) => {
  try {
    await execa('npm', ['create', 'vite@latest', projectName, '--', '--template', template], { stdio: 'ignore' });
  } catch (error) {
    throw error;
  }
};

export const PowerViteInitProject = async (name?: string) => {
  console.log('Welcome to PowerVite! Let’s bootstrap your project.');
  
  // Questions about the project
  const projectName = typeof name === 'undefined' ? 'my-app' : name;
  const { language } = await askUserChoices();
  const template = language === 'TypeScript' ? 'react-ts' : 'react';

  // Create vitjs base project
  try {
    console.log(`Creating your react project named '${projectName}' in '${language}'...`);
    
    await initProject(projectName, template);

    console.log(`Project '${projectName}' created successfully!`);
    console.log('Next steps:');
    console.log(`1.  cd ${projectName}`);
    console.log('2.  npm install');
    console.log('3.  npm run dev');
  } catch (error) {
    console.error('Failed creating the project:', error);
  }
};
