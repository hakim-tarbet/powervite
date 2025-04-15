import figlet from 'figlet';
import { consola } from 'consola';

/**
 * Prints a stylized banner to the console to introduce the project setup process.
 *
 * This function uses the `figlet` library to generate an ASCII art representation
 * of the word "Powervite" and logs it to the console. After the banner and a
 * friendly message to indicate the beginning of the bootstrapping process.
 */
export const printBanner = (): void => {
  const bannerText = figlet.textSync('Powervite', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });

  consola.log(bannerText);
  consola.log('Lets bootstrap your project!');
};

export const printSection = (title: string): void => {
  consola.log('\n\n' + title + '\n');
};
