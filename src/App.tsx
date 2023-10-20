import { useState } from 'react';
import { app } from '@/firebase';
import { getAuth } from 'firebase/auth';

import Router from '@/components/Router';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(app);

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
