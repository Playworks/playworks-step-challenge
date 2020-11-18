import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './JoinTeam.css';
import Logo from '../../../images/PW-hor-logo.png';

// import material ui
import { Button, Typography, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
// import sweetalert
import swal from 'sweetalert';


class JoinTeam extends Component {
  state = {
    selected_team_id: '',
    selected_team_image: ''
  };

  // Array scoped for this component
  teamsOnlyArray = [];

  // Need on load after register to send users contest id to server
  componentDidMount(){
    this.fetchData();
  }

  // function sends two dispatches with async await to fetch captains and teams for join to 
  // list all teams and captains to select from
  fetchData = async () => {
    await this.props.dispatch({type: 'FETCH_CAPTAINS_FOR_JOIN'});
    await this.props.dispatch({type: 'FETCH_TEAMS_FOR_JOIN'});
  }

  // function empties compontent array teamsOnlyArray, sets state of selected_team_id to the value,
  // then runs this.setPhoto function
  handleInputChangeForTeamSelect = async (event) => {
    this.teamsOnlyArray = [];
    await this.setState({
      selected_team_id: event.target.value
    })
    await this.setPhoto();
  }

  // scoped locally sets teamsOnlyArray to array from store and iterates through the loop
  // if the id is === to selected_team_id state then it sets state of selected_team_image to image path at that index
  setPhoto = () => {
    this.teamsOnlyArray = this.props.store.teamsOnly;
    for(let i = 0; i < this.teamsOnlyArray.length; i++){
      if(this.teamsOnlyArray[i].teams_id === this.state.selected_team_id){
        this.setState({
          selected_team_image: this.teamsOnlyArray[i].image_path
        });
        return;
      }
    }
  }

  // Function is a confirmation function mainly for validation if everything is met and isCorrect then will run joinTeam function
  confirmationJoin = () => {
    if(this.state.selected_team_id === ''){
      swal(`Please select a team to join`);
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
          this.joinTeam();
          swal({
            title: "You've successfully joined a team!",
            icon: "success"
          }).then(() => {
            this.props.history.push('/home');
          })
        }
        else{
          swal(`Pick a team to start steppin'!`)
        }
      });
    };
  };

  // Function sends dispatch to saga and communicates with server for a PUT / Join team.
  joinTeam = () => {
    this.props.dispatch({
      type: 'JOIN_TEAM',
      payload: {
        selected_team_id: this.state.selected_team_id,
        user_id: this.props.store.user.id
      }
    });
  }

  render() {
    return (
      <div>
        <div className='createPageLogoDiv'>
          <img className='createPageLogo' alt='playWorksLogo' src= {Logo}/>
        </div>

        <div className='teamForm'>

        <center>
          <Typography variant='h5'>Join a Team</Typography>
            <div className='createTeamName'>
              <FormControl>
                <InputLabel style={{paddingLeft:14}}>
                  Select team by name or captain
                </InputLabel> 
                <Select value={this.state.selected_team_id} 
                  variant='outlined' 
                  style={{width:300}} 
                  onChange={this.handleInputChangeForTeamSelect}>
                  {this.props.store.teams.map((team, i) => 
                  <MenuItem key={i} value={team.teams_id}>{team.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          <div className='joinTeamImageDiv'>
            <img className='joinTeamImage' alt='joinTeamImage' src= {this.state.selected_team_image} />
          </div>
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              size= 'large'
              onClick={this.confirmationJoin}>
              Join Team
            </Button>
          </center>
        </div>
        <div className='createTeamfooter'>
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