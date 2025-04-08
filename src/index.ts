#!/usr/bin/env node

import { PowerViteInitProject } from '@core/initProject';

export const PowerVite = async () => {
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
};

PowerVite();
