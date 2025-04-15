import { ProjectSettings } from 'src/interfaces';
import { addSassSupport } from './sass';

/**
 * Installs and configures the selected styling setup for the project.
 *
 * This method acts as the entry point for applying the desired styling
 * configuration based on the `ProjectSettings.style` value.
 *
 * @param settings - The project settings including the selected style option.
 * @returns A Promise that resolves to `true` on success, or an `Error` object on failure.
 */
export const installAndConfigureStyles = async (settings: ProjectSettings) => {
  switch (settings.style) {
    case 'scss':
      return await addSassSupport();

    default:
      return new Error('Selected style not available');
  }
};
