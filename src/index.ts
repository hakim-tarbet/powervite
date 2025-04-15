#!/usr/bin/env node

import { initProject } from '@core/init';
import { consola } from 'consola';

/**
 * Entry point for the Powervite CLI application.
 *
 * This function parses command line arguments and routes commands accordingly.
 * Currently, it supports the `init` command which initializes a new project.
 *
 * Usage:
 *   - To initialize a new project, run:
 *       $ powervite init <project-name>
 *
 * @async
 */
export const Powervite = async (): Promise<void> => {
  // Extract command line arguments (excluding 'node' and script path).
  const args = process.argv.slice(2);
  const command = args[0];
  const projectName = args[1];

  switch (command) {
    case 'init':
      await initProject(projectName);
      break;

    default:
      consola.error('Command not valid');
      break;
  }
};

Powervite();
