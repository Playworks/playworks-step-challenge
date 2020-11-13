import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './JoinTeam.css';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// import material ui
import { Button, Typography, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
// import sweetalert
import swal from 'sweetalert';


class JoinTeam extends Component {
  state = {
    selected_team_id: '',
  };

  // Need on load after register to send users contest id to server
  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.dispatch({type: 'FETCH_CAPTAINS_FOR_JOIN'});
    await this.props.dispatch({type: 'FETCH_TEAMS_FOR_JOIN'});
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function sends team id to server to update users teams_id in database a.k.a adds user to a team
  // with sweet alert validation. 
  joinTeam = () => {
    if(this.state.selected_team_id === ''){
      swal(`Please select a team to join`)
    }
    else{
      swal({
        title: "Is the selected team correct?",
        icon: "info",
        buttons: {
          cancel: "No",
          yes: true,
        }
      }).then(isCorrect => {
        if(isCorrect){
          this.props.dispatch({
            type: 'JOIN_TEAM',
            payload: {
              selected_team_id: this.state.selected_team_id,
              user_id: this.props.store.user.id
            }
          });
          swal({
            title: "You've successfully joined a team!'",
            icon: "success"
          }).then(() => {
            this.props.history.push('/home');
          })
        };
      });
    };
  };

  render() {
    return (
      <div className='teamForm'>
        <Typography variant='h5'>Join a Team</Typography>
        <center>
        <div>
          <FormControl>
            <InputLabel style={{paddingLeft:14}}>
              Select team by name or captain
            </InputLabel> 
            <Select value={this.state.selected_team_id} variant='outlined' style={{width:300}} onChange={this.handleInputChangeFor('selected_team_id')}>
              {this.props.store.teams.map((team, i) => 
              <MenuItem key={i} value={team.teams_id}>{team.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
          <img style={{marginTop: '1rem'}} src= { Placeholder } />
          <Button variant='contained' 
            color='primary'
            style={{marginTop: '2rem'}} 
            size= 'large'
            onClick={this.joinTeam}>
            Join Team
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JoinTeam);