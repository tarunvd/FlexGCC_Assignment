import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material';


// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#11ff25',
      light: '#FFa4ac',
      dark: '#61ad1f',
    },
    secondary: {
      main: '#FF8ac9',
      dark: '#FF72a4',
      light: '#a2c4e4',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#554aee',
      secondary: 'rgba(55, 112, 197, 0.8)',
      disabled: 'rgba(121,74,89,0.6)',
    },
},
});
