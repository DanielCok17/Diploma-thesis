import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/Login/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Vytvorenie vlastnej témy
const theme = createTheme({
  palette: {
    error: {
      main: '#f44336', // Nastavte svoju farbu pre error
    },
    // ostatné farby témy
  },
  // ostatné nastavenia témy
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <ThemeProvider theme={theme}>

      <AuthProvider>
        <App />
      </AuthProvider>
      </ThemeProvider>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
