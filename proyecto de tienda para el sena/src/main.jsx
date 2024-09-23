import ReactDOM from 'react-dom/client'; // Importa desde react-dom/client en lugar de react-dom
import React from 'react';
import App from './App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
