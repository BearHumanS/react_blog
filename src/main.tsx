import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <Router>
          <GlobalStyle />
          <App />
        </Router>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
);
