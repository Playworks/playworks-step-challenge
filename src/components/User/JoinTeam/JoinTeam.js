import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './JoinTeam.css';
import axios from 'axios';
import Logo from '../../../images/PW-hor-logo.png';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// import material ui
import { Button, Typography, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';



class JoinTeam extends Component {
  state = {
    selected_team_id: '',
  };

  // Need on load after register to send users contest id to server
  componentDidMount(){
  this.props.dispatch({type: 'FETCH_TEAMS_FOR_JOIN'});
  this.props.dispatch({type: 'FETCH_CAPTAINS_FOR_JOIN'});
  }

  // Component Array
  teamsAndCaptains = []

  // Function sends Get request to server to get all teams by contest id and then push it into the global array
  fetchTeamsForSearch = (contests_id) => {
    axios({
      type: 'GET',
      url: `api/teams/searchforteams/${contests_id}`
    })
    .then(result => {
      for(let team of result.data){
        this.teamsAndCaptains.push(team);
      }
    })
    .catch(error => {
      console.log('We have an error in FetchTeamsForSearch function', error);
    });
  };

  // Function sends Get request to server to get all captains by contest id and then push it into the global array
  fetchCaptainsForSearch = (contests_id) => {
    axios({
      type: 'GET',
      url: `api/teams/searchforcaptains/${contests_id}`
    })
    .then(result => {
      for(let captain of result.data){
        this.teamsAndCaptains.push(captain);
      }
    })
    .catch(error => {
      console.log('We have an error in FetchTeamsForSearch function', error);
    });
  }

  // On change of select contests runs two functions that send get requests to get all teams / captains by contest is
  handleTeamsAndCaptainsSearchFunction = (event) => {
    // At the beginning of function empties array
    this.teamsAndCaptains = [];
    // Runs both functions with agruement of our event.target.value
    this.fetchTeamsForSearch(event.target.value);
    this.fetchCaptainsForSearch(event.target.value);
    console.log('this is the array', this.teamsAndCaptains);
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <img className='createPageLogo' src= {Logo}/>
        <div className='teamForm'>
          <Typography variant='h5'>Join a Team</Typography>
          <center>
            <div className='joinTeamSearch'>
              <Autocomplete
                id="combo-box-demo"
                options={this.teamsAndCaptains}
                getOptionLabel={(option) => option.name}
                style={{ width: '100%' }}
                onClick={this.handleInputChangeFor('selected_team_id')}
                renderInput={(params) => <TextField {...params}  onChange={this.handleInputChangeFor('selected_team_id')} label="Search for team or captain" variant="outlined" />}
              />
            </div>
            <img style={{marginTop: '1rem', width: '200px', display: 'block'}} src= { Placeholder } />
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              size= 'large'
              onClick={() => {this.props.history.push('/home')}}>
              Join Team
            </Button>
          </center>
        </div>
        <div id='footer'>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {this.props.history.push('/createorjointeam')}}>
            Go Back
          </button>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {this.props.history.push('/createteam')}}>
            Create Team
          </button>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
            Log Out
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JoinTeam);