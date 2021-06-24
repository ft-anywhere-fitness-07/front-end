import './App.css';
import React, { useState, useEffect } from 'react';
import axiosWithAuth from './utils/axiosWithAuth';
import { connect } from 'react-redux';

// components
import NavBar from './components/NavBar';

function App() {
  // const [isAuth, setIsAuth] = useState(false)
  // const [isInstructor, setIsInstructor] = useState(false);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    // if(localStorage.getItem("token")){
    //   setIsAuth(true)
    // }
    // if(localStorage.getItem("role")){
    //   setIsInstructor(true)
    // }
    axiosWithAuth()
    .get('/api/classes')
    .then(res => {
      setClassList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <NavBar /*isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor}*/ classList={classList} setClassList={setClassList}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    isInstructor: state.login.isInstructor
  }
}

export default connect(mapStateToProps)(App);
