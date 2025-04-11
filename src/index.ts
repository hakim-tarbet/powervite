#!/usr/bin/env node

import { PowerViteInitProject } from '@core/initProject';
import { consola } from 'consola';

export const PowerVite = async () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const projectName = args[1];

  switch (command) {
    case 'init':
      await PowerViteInitProject(projectName);
      break;
    default:
      consola.error('Command not valid');
      break;
  }
};

PowerVite();
