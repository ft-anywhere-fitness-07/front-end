import './App.css';
import React, { useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'

// components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Classes from './components/Classes';
import Home from './components/Home';
import CreateClass from './components/CreateClass';

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

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { push } = useHistory();
  
  const logout = () => {
    localStorage.removeItem("token");
    push("/")
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>

       <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="nav bar" centered>
          <Tab label="Home" {...a11yProps(0)} component={Link} to="/" className="navLink"/>

          <Tab label="Sign Up" {...a11yProps(1)} component={Link} to="/sign-up" className="navLink"/>

          <Tab label="Sign In" {...a11yProps(2)} component={Link} to="/sign-in" className="navLink"/>

          <Tab label="Classes" {...a11yProps(3)} component={Link} to="/classes" className="navLink"/>

          <Tab label="Logout" {...a11yProps(4)} component={Link} to="/" className="navLink"/>

        </Tabs>
      </AppBar>
{/* 
      <TabPanel value={value} index={0}>
        Home
      </TabPanel>
      <TabPanel value={value} index={1}>
        Sign Up
      </TabPanel>
      <TabPanel value={value} index={2}>
        Sign In
      </TabPanel>
      <TabPanel value={value} index={3}>
        Classes
      </TabPanel>
      <TabPanel value={value} index={4}>
        Logout
      </TabPanel> */}

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
