#!/usr/bin/env node

import { questions } from './cli/inputs';
import { createViteProject } from './cli/setup';

export async function PowerViteInitProject(name?: string) {
  console.log('Welcome to PowerVite! Let’s bootstrap your project.');
  
  // Questions about project
  const projectName = typeof name === 'undefined' ? 'my-app' : name;
  const { language } = await questions();
  const template = language === 'TypeScript' ? 'react-ts' : 'react';

  // Create project
  try {
    console.log(`Creating your react project named '${projectName}' in '${language}'...`);
    
    await createViteProject(projectName, template);

    console.log(`Project '${projectName}' created successfully!`);
    console.log('Next steps:');
    console.log(`1.  cd ${projectName}`);
    console.log('2.  npm install');
    console.log('3.  npm run dev');
  } catch (error) {
    console.error('Failed creating the project:', error);
  }
}

export async function PowerVite() {
  const args = process.argv.slice(2);
  const command = args[0];
  const projectName = args[1];

  switch (command) {
    case 'init':
      await PowerViteInitProject(projectName);
      break;
    default:
      console.error('Command not valid');
      break;
  }
}

if (require.main === module) {
  PowerVite();
}