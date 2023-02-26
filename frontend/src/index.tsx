import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

const root = document.getElementById('root') as HTMLElement;

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
