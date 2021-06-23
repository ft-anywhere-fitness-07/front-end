import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth}/>
    </div>
  );
}

export default App;
