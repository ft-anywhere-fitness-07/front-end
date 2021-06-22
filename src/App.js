import './App.css';
import { Link, Route, Switch } from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

// components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Classes from './components/Classes';
import Home from './components/Home';
import CreateClass from './components/CreateClass';

function App() {
  const { push } = useHistory();
  
  const logout = () => {
    localStorage.removeItem("token");
    push("/")
  }

  const isAuth = localStorage.getItem("token");

  return (
    <div className="App">

       <AppBar position="static">
        <Tabs aria-label="simple tabs example" centered>
          <Link to='/' className="navLink"><Tab label="Home"/></Link>

          {isAuth ? <div></div> : <Link to='/sign-up' className="navLink"><Tab label="Sign Up"  /></Link>}

          {isAuth ?  <div></div> : <Link to='/sign-in' className="navLink"><Tab label="Sign In"  /></Link>}

          <Link to='/classes' className="navLink"><Tab label="Classes"  /></Link>

          {isAuth? <Link className="navLink" onClick={logout}><Tab label="Logout"/></Link> : <div></div>}

        </Tabs>
      </AppBar>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/sign-up'>
          <SignUp />
        </Route>

        <Route exact path='/sign-in'>
          <SignIn />
        </Route>

        <PrivateRoute exact path='/classes' component={CreateClass}>
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
