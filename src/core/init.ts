import { execa } from 'execa';
import ora from 'ora';
import { consola } from 'consola';
import { printBanner } from '@utils/banner';
import { promptProjectOptions } from '@cli/prompts';
import { installAndConfigureStyles } from '@features/styling';

interface ProjectSettings {
  projectName: string;
  template: string;
  language: string;
  style: string;
}


/**
 * Prompts the user for project settings and determines the chosen template.
 * Uses a default project name if none is provided.
 *
 * @param name - Optional project name; defaults to 'my-app' if not provided.
 * @returns The project settings including project name, template, and language descriptor.
 */
const getInitProjectSettings = async (name?: string): Promise<ProjectSettings> => {
  const projectName = name || 'my-app';

  // Prompt user choices regarding their preferences.
  const { useTypescript, style } = await promptProjectOptions(() => {
    consola.error('Questions cancelled');
    process.exit(1);
  });

  const template = useTypescript ? 'react-ts' : 'react';
  const language = useTypescript ? 'TypeScript' : 'JavaScript';

  return { projectName, template, language, style };
};

/**
 * Creates a React project using the Vite template based on provided settings.
 *
 * @param settings - The configuration settings for the project.
 */
const createReactProject = async (settings: ProjectSettings): Promise<void> => {
  const spinner = ora(
    `Setting up a React project with ${settings.language} in '${settings.projectName}'`
  ).start();

  try {
    await execa(
      'npm',
      ['create', 'vite@latest', settings.projectName, '--', '--template', settings.template],
      { stdio: 'ignore' }
    );
    spinner.succeed('Project created successfully!');
  } catch (error) {
    spinner.fail('Project creation failed. Please try again.');
    consola.error(error);
  }
};

const enterProjectDir = async (settings: ProjectSettings) => {
  try {
    process.chdir(settings.projectName);
  } catch (error) {
    consola.error(error);
  }
};

const parseStylingOption = async (settings: ProjectSettings) => {
  const spinner = ora('Installing and configuring styling option').start();

  if (settings.style === 'none') {
    spinner.succeed('Skipped styling option instalation');
    return;
  }

  try {
    await installAndConfigureStyles(settings.style);
    spinner.succeed('Styles insalled successfully');
  } catch (error) {
    spinner.fail('Styling instalation failed. Please try again.');
    consola.error(error);
  }
};


/**
 * Initializes the project setup by first getting the project settings and then
 * creating the React project.
 *
 * @param name - Optional project name.
 */
export const initProject = async (name?: string): Promise<void> => {
  printBanner();

  // Get init project settings from user.
  const settings = await getInitProjectSettings(name);

  // Create the project using the collected settings.
  await createReactProject(settings);

  // Entring to the project directory
  await enterProjectDir(settings);

  // Parse and install style option
  await parseStylingOption(settings);
    
  consola.box('Run the project with: npm run dev');
};
