import { createTheme } from '@mui/material/styles';

// Define custom colors
const customColors = {
  primary: '#346ccb',
  secondary: '#fbfcfd',
  error: '#e74c3c',
  warning: '#f39c12',
  success: '#2ecc71',
};

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: customColors.primary,
    },
    secondary: {
      main: customColors.secondary,
    },
    error: {
      main: customColors.error,
    },
    warning: {
      main: customColors.warning,
    },
    success: {
      main: customColors.success,
    },
  },
});

export default theme;
