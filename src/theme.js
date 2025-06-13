import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#9C27B0' },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Roboto, Inter, sans-serif',
  },
});

export default theme;
