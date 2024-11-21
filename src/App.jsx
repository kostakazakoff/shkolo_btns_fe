import { Routes, Route } from 'react-router-dom';
import Path from './helpers/paths.js';
import Home from './components/Home.jsx'
import Edit from './components/Edit.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.EDIT} element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
