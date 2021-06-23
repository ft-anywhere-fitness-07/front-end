import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false);

  return (
    <div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor}/>
    </div>
  );
}

export default App;
