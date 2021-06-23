import React, { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom'

// Material UI
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'

// components
import SignUp from './SignUp';
import SignIn from './SignIn';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import CreateClass from './CreateClass';
import Classes from './Classes';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));


  const NavBar = (props) => {
    const { isAuth, setIsAuth, isInstructor, setIsInstructor, classList, setClassList } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { push } = useHistory();

    const logout = () => {
      localStorage.removeItem("token");
      setIsAuth(false);
      push("/");
    }  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
      return (
        <div className={classes.root}>

            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="nav bar" centered>
                <Tab label="Home" {...a11yProps(0)} component={Link} to="/" className="navLink"/>
                {isAuth ? <div></div> : <Tab label="Sign Up" {...a11yProps(1)} component={Link} to="/sign-up" className="navLink"/>}
                {isAuth ? <div></div> : <Tab label="Sign In" {...a11yProps(2)} component={Link} to="/sign-in" className="navLink"/>}
                <Tab label="Classes" {...a11yProps(3)} component={Link} to="/classes" className="navLink"/>
                {isAuth ? <Tab label="Logout" {...a11yProps(0)} component={Link} onClick={logout} to="/" className="navLink"/> : <div></div>}
            </Tabs>
            </AppBar>

            <Switch>
            <Route exact path='/'>
                <Home />
            </Route>

            <Route exact path='/sign-up'>
                <SignUp isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor}/>
            </Route>

            <Route exact path='/sign-in'>
                <SignIn isAuth={isAuth} setIsAuth={setIsAuth} isInstructor={isInstructor} setIsInstructor={setIsInstructor}/>
            </Route>

            <PrivateRoute exact path='/classes'> 
                <Classes isInstructor={isInstructor} classList={classList} setClassList={setClassList} />
            </PrivateRoute>

            <PrivateRoute exact path='/create-class'>
                 <CreateClass isInstructor={isInstructor} classList={classList} setClassList={setClassList} />
            </PrivateRoute>
            </Switch>
        </div>
      )
  }

  export default NavBar;