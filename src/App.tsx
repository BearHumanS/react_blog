import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>home</h1>} />
      <Route path="/posts" element={<h1>1</h1>} />
      <Route path="/posts/:id" element={<h1>2</h1>} />
      <Route path="/posts/new" element={<h1>3</h1>} />
      <Route path="/posts/edit/:id" element={<h1>4</h1>} />
      <Route path="/profile" element={<h1>5</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
