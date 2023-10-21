import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
);
