import figlet from 'figlet';
import { consola } from 'consola';

export const printBanner = () => {
  consola.log(
    figlet.textSync('Powervite', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  );

  consola.log('Let\'s bootstrap your project!');
};
