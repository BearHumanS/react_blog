import { useState, useEffect, useContext } from 'react';
import { app } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import Router from '@/components/Router';
import Loading from './components/Loading';
import ThemeContext from './context/ThemeContext';
import styled from 'styled-components';
import { theme } from './styles/theme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [init, setInit] = useState(false);
  const context = useContext(ThemeContext);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <ThemeProvider theme={theme[context.theme]}>
      <StyledWrapper>
        <ToastContainer position="top-center" closeOnClick={true} />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loading />}
      </StyledWrapper>
    </ThemeProvider>
  );
}

const StyledWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  transition: all 0.25s linear;
`;

export default App;
