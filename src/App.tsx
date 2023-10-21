import { useState, useEffect } from 'react';
import { app } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from '@/components/Router';
import Loading from './components/Loading';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [init, setInit] = useState(false);
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
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loading />}
    </>
  );
}

export default App;
