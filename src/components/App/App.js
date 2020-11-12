import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminRoute from '../AdminRoute/AdminRoute';


import AboutPage from '../Templates/AboutPage/AboutPage';
import ContestHome from '../User/ContestHome/ContestHome';
import TeamHome from '../User/TeamHome/TeamHome';
import SubmitPhotos from '../User/SubmitPhotos/SubmitPhotos';
import SubmitSteps from '../User/SubmitSteps/SubmitSteps';
import Rules from '../User/Rules/Rules';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../User/RegisterPage/RegisterPage';
import './App.css';
import CreateOrJoinTeam from '../User/CreateOrJoinTeam/CreateOrJoinTeam';
import CreateTeam from '../User/CreateTeam/CreateTeam';
import JoinTeam from '../User/JoinTeam/JoinTeam';
import EditUserLogs from '../User/EditUserLogs/EditUserLogs';
import AdminChallenges from '../Admin/AdminChallenges/AdminChallenges';
import Challenges from '../User/Challenges/Challenges';
import CreateContest from '../Admin/CreateContest/CreateContest';
import EditChallenges from '../Admin/EditChallenges/EditChallenges';
import EditContests from '../Admin/EditContests/EditContests';
import EditRules from '../Admin/EditRules/EditRules';
import EditFAQ from '../Admin/EditFAQ/EditFAQ';
import PlayworksAdminHome from '../Admin/PlayworksAdminHome/PlayworksAdminHome';
import ContestDescriptionPage from '../Admin/ContestDescriptionPage/ContestDescriptionPage';
import moment from 'moment';
import ImageUpload from '../User/SubmitPhotos/ImageUpload';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.setDailyChallenge();
  }

  setDailyChallenge = () => {
    this.props.dispatch({
      type: 'FETCH_DAILY_CHALLENGE',
      payload: moment(Date()).format().substring(0,10)
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              exact
              path="/addphoto"
              component={SubmitPhotos}
            />

            <ProtectedRoute
              exact
              path="/addsteps"
              component={SubmitSteps}
            />

            <ProtectedRoute
              exact
              path="/rules"
              component={Rules}
            />

            <ProtectedRoute
              exact
              path="/team"
              component={TeamHome}
            />

            <ProtectedRoute
              exact
              path="/createorjointeam"
              component={CreateOrJoinTeam}
            />

            <ProtectedRoute
              exact
              path="/createteam"
              component={CreateTeam}
            />

            <ProtectedRoute
              exact
              path="/jointeam"
              component={JoinTeam}
            />

            <ProtectedRoute
              exact
              path="/editlogs"
              component={EditUserLogs}
            />

            <AdminRoute
            exact
            path='/adminchallenges'
            component={AdminChallenges}
            />

            <ProtectedRoute
              exact
              path="/challenges"
              component={Challenges}
            />

            <AdminRoute
              exact
              path="/createcontest"
              component={CreateContest}
            />

            <ProtectedRoute
              exact
              path="/imageupload"
              component={ImageUpload}
            />

            <AdminRoute
              exact
              path="/editchallenges"
              component={EditChallenges}
            />

            <AdminRoute
              exact
              path="/editcontests"
              component={EditContests}
            />

            <AdminRoute
              exact
              path="/editrules"
              component={EditRules}
            />

            <AdminRoute
              exact
              path="/adminhome"
              component={PlayworksAdminHome}
            />

            <AdminRoute
              exact
              path="/contestdescription"
              component={ContestDescriptionPage}
            />

            <AdminRoute
              exact
              path="/editfaq"
              component={EditFAQ}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <AdminRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/adminhome"
            />
            <ProtectedRoute
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/home"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/home"
              />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows ContestHome at "/home"
              exact
              path="/home"
              component={ContestHome}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default connect()(App);
