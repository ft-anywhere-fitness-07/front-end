import './App.css';
import React from 'react';
import { connect } from 'react-redux';

// components
import NavBar from './components/NavBar';

function App() {

  return (
    <div>
      <NavBar/>
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
