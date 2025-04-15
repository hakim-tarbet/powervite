import { consola } from 'consola';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs/promises';
import ora from 'ora';

/**
 * Installs the Sass package as a development dependency using npm.
 *
 * This method wraps the installation process in a try/catch block
 * and logs any errors using `consola`.
 *
 * @returns A promise that resolves to `true` on success, or `false` on failure.
 */
const installSass = async (): Promise<boolean> => {
  try {
    await execa('npm', ['install', '-D', 'sass']);
    return true;
  } catch (error: unknown) {
    consola.error(error);
    return false;
  }
};

/**
 * Renames default CSS files to SCSS files if they exist.
 *
 * Specifically:
 * - `src/App.css` -> `src/App.scss`
 * - `src/index.css` -> `src/index.scss`
 *
 * @returns A promise that resolves to `true` if all renames succeeded,
 *          or an `Error` if any file couldn't be renamed.
 */
const renameDefaultCssFiles = async (): Promise<boolean | Error> => {
  const filesToRename = [
    { from: 'src/App.css', to: 'src/App.scss' },
    { from: 'src/index.css', to: 'src/index.scss' },
  ];

  for (const { from, to } of filesToRename) {
    const fromPath = path.join(process.cwd(), from);
    const toPath = path.join(process.cwd(), to);

    try {
      await fs.access(fromPath);
      await fs.rename(fromPath, toPath);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code: string }).code === 'ENOENT'
      ) {
        continue;
      }

      return new Error('Field to rename CSS files');
    }
  }

  return true;
};

/**
 * Updates import paths in key React entry files to point to `.scss` instead of `.css`.
 *
 * Specifically updates:
 * - `import './App.css'` -> `import './App.scss'` in `src/App.tsx`
 * - `import './index.css'` -> `import './index.scss'` in `src/main.tsx`
 *
 * If the target files or import statements are missing, it's skipped silently.
 * Any other file system issues are returned as `Error`.
 *
 * @returns A promise that resolves to `true` on success, or `Error` on failure.
 */
const updateStyleImports = async (): Promise<boolean | Error> => {
  const filesToUpdate = ['src/App.tsx', 'src/main.tsx'];
  const replacements: Record<string, string> = {
    './App.css': './App.scss',
    './index.css': './index.scss',
  };

  for (const file of filesToUpdate) {
    const filePath = path.join(process.cwd(), file);

    try {
      const exists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
      if (!exists) continue;

      let content = await fs.readFile(filePath, 'utf-8');
      let modified = false;

      for (const [oldImport, newImport] of Object.entries(replacements)) {
        if (content.includes(oldImport)) {
          content = content.replace(oldImport, newImport);
          modified = true;
        }
      }

      if (modified) {
        await fs.writeFile(filePath, content);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return new Error(`Failed to update style imports in ${file}`);
    }
  }

  return true;
};

/**
 * Add Sass support setup.
 *
 * This method:
 * 1. Installs `sass` via npm
 * 2. Renames default CSS files to SCSS files
 * 3. Updates style import paths
 *
 * @returns A promise that resolves to `true` on success,
 *          or an `Error` if npm install step fails.
 */
export const addSassSupport = async (): Promise<boolean | Error> => {
  // Installing SASS
  const spinnerInsall = ora('Installing SASS styles support').start();
  const install = await installSass();

  if (!install) {
    spinnerInsall.fail('SASS could not be installed');
    return new Error();
  }

  spinnerInsall.succeed('SASS installed successfully');

  // Renaming .css file to .scss
  const spinnerRename = ora('Renaming CSS files').start();
  const renameFiles = await renameDefaultCssFiles();

  if (!renameFiles) {
    spinnerRename.fail('Could not rename the default CSS files, please rename them manually');
  }

  spinnerRename.succeed('CSS files updated successfully to .SCSS');

  // Updating styles imports to point to .scss files
  const spinnerImports = ora('Updating the CSS files imports').start();
  const updateImports = await updateStyleImports();

  if (!updateImports) {
    spinnerImports.fail('Could not update the styles imports, please update them manually');
  }

  spinnerImports.succeed('Styles files imports updated successfully');

  return true;
};
