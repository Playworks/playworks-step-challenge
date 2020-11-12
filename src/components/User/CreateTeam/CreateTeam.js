import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateTeam.css';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
import Logo from '../../../images/PW-hor-logo.png';
// import material ui
import { 
  Button, TextField, Typography,
  InputLabel, MenuItem, Select
} from '@material-ui/core';
// import sweetalert
import swal from 'sweetalert';

class CreateTeam extends Component {

  state = {
    team_name: '',
    team_photo: '',
    contests_id: '',
    company_name: '',
  }

  componentDidMount() {
    // Dispatching fetch contest on this page load so that users have access contest for drop down.
    this.props.dispatch({ type: 'FETCH_CONTEST'});
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function sets state of photo to selected file/image in photo input.
  photoSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      team_photo: event.target.files[0],
    });
  };

  // Function dispatches info to create team to saga Listening for 'CREATE_TEAM'
  createTeam = () => {
    if(this.state.team_name === ''){
      swal(`Please enter a team name`);
    }
    else if(this.state.company_name === ''){
      swal(`Please enter company name`);
    }
    else if(this.state.contests_id === ''){
      swal(`Please select a contest`);
    }
    else{
      swal({
        title: "Is the submitted info correct?",
        icon: "info",
        buttons: {
          cancel: "No",
          yes: true,
        }
      }).then(isCorrect => {
        if(isCorrect){
          this.props.dispatch({
            type: 'CREATE_TEAM',
            payload: {
              team_name: this.state.team_name,
              team_photo: this.state.team_photo,
              contests_id: this.state.contests_id,
              company_name: this.state.company_name,
            }
        });
        swal({
          title: "Your Team has been created!",
          icon: "success"
        }).then(() => {
          this.setState({
            team_name: '',
            team_photo: '',
            contests_id: '',
            company_name: '',
          });
          this.props.history.push('/home');
        })
        }
      })
    };
  };

  render() {
    console.log('this is our state', this.state);
    console.log('in createTeam js these are our props', this.props);
    return (
      <div>
        <img className='createPageLogo' src= {Logo}/>

        <div className='teamForm'>
          <Typography variant='h5'>Create a Team</Typography>

          <div className='createTeamName'>
            <TextField 
              id="outlined-basic" 
              label="Team name" 
              variant="outlined"
              onChange={this.handleInputChangeFor('team_name')}
            />
          </div>

          <div className='createPageCompanyName'>
            <TextField 
              id="outlined-basic" 
              label="Company Name" 
              variant="outlined"
              onChange={this.handleInputChangeFor('company_name')}
            />
          </div>

          <div className='createTeamPageSelectContest'>
            <InputLabel>
              Select Contest
            </InputLabel> 
            <Select value={this.state.contests_id} onChange={this.handleInputChangeFor('contests_id')}>
              {this.props.store.contest.map(contest => 
              <MenuItem key={contest.id} value={contest.id}>{contest.name}</MenuItem>
              )}
            </Select>
          </div>
          <img style={{marginTop: '1rem'}} height='250' src= { Placeholder } />
          <input
            type='file'
            style={{display: 'none'}}
            ref={photoInput => this.photoInput = photoInput}
            onChange={this.photoSelectedHandler} 
          />
          <Button 
            variant='contained' 
            onClick={() => this.photoInput.click()} >
              Choose photo
          </Button>
          <center>
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              onClick={this.createTeam}>
              Submit
            </Button>
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);