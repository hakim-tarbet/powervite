import { execa } from 'execa';

interface StyleOption {
  name: string;
  package: string;
}

const availableStyles: { [key: string]: StyleOption } = {
  none: {
    name: 'None (Plain CSS)',
    package: '',
  },
  scss: {
    name: 'SCSS / Sass',
    package: 'sass',
  },
  'styled-components': {
    name: 'Styled Components',
    package: 'styled-components',
  },
  tailwind: {
    name: 'Tailwind CSS',
    package: 'tailwindcss',
  },
  bootstrap: {
    name: 'Bootstrap UI',
    package: 'bootstrap',
  },
  'material-ui': {
    name: 'Material UI',
    package: '@mui/material',
  },
  'chakra-ui': {
    name: 'Chakra UI',
    package: '@chakra-ui/react',
  },
  'ant-design': {
    name: 'Ant Design',
    package: 'antd',
  },
};

export const installAndConfigureStyles = async (style: string) => {
  if (!availableStyles[style]) {
    return new Error('Selected style not available');
  }

  try {
    await execa('npm', ['install', `${availableStyles[style].package}@latest`]);
    return true;
  } catch (error) {
    return error;
  }
};
