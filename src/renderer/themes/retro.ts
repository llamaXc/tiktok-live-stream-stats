
import { createTheme } from '@mui/material/styles';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#113269', // Primary color
    },
    secondary: {
      main: '#468faf', // Secondary color
    },
    warning:{
      main: '#f9dcc4'
    }

  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
