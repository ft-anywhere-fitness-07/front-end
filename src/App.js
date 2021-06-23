import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';

const initialClasses = [
  {
    name: "Stand Up PaddleBoard Yoga",
    type: "Yoga",
    time: "8:00",
    duration: "60 min",
    intensityLvl: 3,
    attendees:6,
    maxSize: 20,
    location: "Loveland, CO",
  },
  {
    name: "Long Run",
    type: "Running",
    time: "7:00",
    duration: "90 min",
    intensityLvl: 7,
    attendees: 5,
    maxSize: 40,
    location: "Estes Park, CO",
  }
]

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isInstructor, setIsInstructor] = useState(false);
  const [classList, setClassList] = useState(initialClasses);


  return (
    <div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor} classList={classList} setClassList={setClassList}/>
    </div>
  );
}

export default App;
