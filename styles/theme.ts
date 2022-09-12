import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
  
  export const theme = extendTheme({
    config,
    fonts: {
      heading: `"Alegreya Sans", sans-serif`,
      body: `"Alegreya Sans", sans-serif`,
    },
    colors: {
      // "gray": {
      //   "50": "#F2F2F2",
      //   "100": "#DBDBDB",
      //   "200": "#C4C4C4",
      //   "300": "#ADADAD",
      //   "400": "#969696",
      //   "500": "#808080",
      //   "600": "#666666",
      //   "700": "#4D4D4D",
      //   "800": "#333333",
      //   "900": "#1A1A1A"
      // },
      gray: {
        '50': '#F2F2F2',
        '100': '#DBDBDB',
        '200': '#C4C4C4',
        '300': '#ADADAD',
        '400': '#969696',
        '500': '#808080',
        '600': '#1a1d1e',
        '700': '#151718',
        '800': '#060707',
        '900': '#000',
      },
      brand: {
        '50': '#E6FFFF',
        '100': '#B8FEFE',
        '200': '#8BFEFE',
        '300': '#5EFDFD',
        '400': '#30FDFD',
        '500': '#03FCFC',
        '600': '#02CACA',
        '700': '#029797',
        '800': '#016565',
        '900': '#013232',
      },
    },
  })
  