import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 765,
      lg: 1024,
      xl: 1536,
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
