import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './JoinTeam.css';
import axios from 'axios';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// import material ui
import { Button, Typography, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';



class JoinTeam extends Component {
  state = {
    contests_id: '',
    selected_team_id: '',
  };

  // Component Array
  teamsAndCaptains = []

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTEST'});
  }

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
    this.setState({
      contests_id: event.target.value
    });
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
    console.log('this is our state', this.state);
    return (
      <div className='teamForm'>
        <Typography variant='h5'>Join a Team</Typography>
        <center>
          <InputLabel>
            Select Contest
          </InputLabel> 
          <Select value={this.state.contests_id} onChange={this.handleTeamsAndCaptainsSearchFunction}>
            {this.props.store.contest.map(contest => 
            <MenuItem key={contest.id} value={contest.id}>{contest.name}</MenuItem>
            )}
          </Select>

          <Autocomplete
            id="combo-box-demo"
            options={this.teamsAndCaptains}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} onChange={this.handleInputChangeFor('selected_team_id')} label="Search for team or captain" variant="outlined" />}
          />
          <img style={{marginTop: '1rem'}} src= { Placeholder } />
          <Button variant='contained' 
            color='primary'
            style={{marginTop: '2rem'}} 
            size= 'large'
            onClick={() => {this.props.history.push('/home')}}>
            Join Team
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JoinTeam);