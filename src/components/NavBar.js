import React, { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from './../actions/loginActions';

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
import EditClass from './EditClass';


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
    const { isAuth } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { push } = useHistory();

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      props.logout();
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
                {isAuth ? <Tab label="Classes" {...a11yProps(3)} component={Link} to="/classes" className="navLink"/> : <div></div>}
                {isAuth ? <Tab label="Logout" {...a11yProps(0)} component={Link} onClick={logout} to="/" className="navLink"/> : <div></div>}
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

            <PrivateRoute exact path='/classes' > 
                <Classes />
            </PrivateRoute>

            <PrivateRoute exact path='/create-class' >
                 <CreateClass />
            </PrivateRoute>

            <PrivateRoute exact path='/edit-class/:id'>
                 <EditClass />
            </PrivateRoute>
            </Switch>
        </div>
      )
  }

  const mapStateToProps = (state) => {
    return{
      isAuth: state.login.isAuth
    }
  }

  export default connect(mapStateToProps, { logout })(NavBar);