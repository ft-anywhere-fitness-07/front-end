import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component:Component, ...rest}) => {
    return <Route {...rest} render={(props) => (
        props.isAuth ? <Component {...props} />
        : <Redirect to="/sign-in" />
    )}/>
}

const mapStateToProps = (state) => {
    return {
      isAuth: state.login.isAuth,
    }
  }
  
  export default connect(mapStateToProps)(PrivateRoute);
// export default PrivateRoute;