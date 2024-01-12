import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './styles.css';
import './style.css';

const app = ReactDOM.createRoot(document.getElementById('root'));

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

