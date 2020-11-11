import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContestHome from '../User/ContestHome/ContestHome';
import LoginPage from '../LoginPage/LoginPage';
import PlayworksAdminHome from '../Admin/PlayworksAdminHome/PlayworksAdminHome';
import mapStoreToProps from '../../redux/mapStoreToProps';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

const AdminRoute = (props) => {
  // Using destructuring, this takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    // redirect path to be used if the user is authorized
    adminRedirect,
    store,
    ...otherProps
  } = props;

  let ComponentToShow;

  if (store.user.admin === 'ADMIN') {
    // if the user is logged in (only logged in users have ids)
    // show the component that is protected
    ComponentToShow = PlayworksAdminHome;
  } else {
    
    if(store.user.id) {
      ComponentToShow = ContestHome;
    } else {
      ComponentToShow = LoginPage;
    }
   
  }

  // redirect a logged in user if an authRedirect prop has been provided
  if (store.user.id && adminRedirect != null) {
    return <Redirect exact from={otherProps.path} to={adminRedirect} />;
  } else if (!store.user.id && adminRedirect != null) {
    ComponentToShow = ComponentToProtect;
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...otherProps}
      component={ComponentToShow}
    />
  );
};

export default connect(mapStoreToProps)(AdminRoute);