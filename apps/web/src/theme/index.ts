// ColorPalette.ts - Setup your app-wide color palette matching the image
// Primary yellow-green: #F4C430 (main buttons, accents)
// Secondary teal: #00A676 (features, highlights)
// Neutrals: #FFFFFF (white), #F5F7FA (light bg), #2D3748 (dark text), #4A5568 (gray)

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F4C430', // Vibrant yellow-green from buttons
      light: '#F7D794',
      dark: '#D4A017',
    },
    secondary: {
      main: '#00A676', // Teal from feature sections
      light: '#4DD0A0',
      dark: '#007B5A',
    },
    background: {
      default: '#F5F7FA', // Light gray bg
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Dark text
      secondary: '#4A5568', // Gray text
    },
    common: {
      white: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});
