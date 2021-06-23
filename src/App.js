import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false);
  const [classList, setClassList] = useState([]);

  return (
    <div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor} classList={classList} setClassList={setClassList}/>
    </div>
  );
}

export default App;
