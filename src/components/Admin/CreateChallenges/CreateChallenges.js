import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateChallenges.css';
import { Button, TextField, Typography } from '@material-ui/core';

class CreateChallenges extends Component {
  state = {
    name: '',
    description: '',
    date: ''
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });                
  };

  // function creates challenge, sends name, description and date as an object to saga.
  createChallenges = (event) => {    
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_CHALLENGES',
      payload: {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
      },
    });
    this.setState({
      name: '',
      description: '',
      date: ''
    });
  }; // end createContest

  render() {
    return (
      <div className='adminCreateChallengeContainer'>
        <div className='adminCreateChallengeHeader'>
          <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>Add Challenge</Typography>
        </div>
        <div className='adminChallengeNameInput'>
          <TextField id='outlined-basic'
            style={{width: '100%'}}
            type="text"
            label='Challenge Name'
            variant='outlined'
            value={this.state.name}
            required
            onChange={this.handleInputChangeFor('name')}
          >
          </TextField>
        </div>
        <div className='adminChallengeDescriptionInput'>
          <TextField 
            id="outlined-multiline-static"
            style={{width: '100%'}}
            type="text"
            multiline
            rows={4}
            label='Description'
            variant='outlined'
            value={this.state.description}
            required
            onChange={this.handleInputChangeFor('description')}
          >
          </TextField>
        </div>

        <div className='adminCreateChallengeDate'>
          <div className='challengeDate'>
            <label htmlFor="challenge_date">
              Challenge Date:
              <input
                style={{display: 'block', color: 'rgb(118, 118, 118)', padding: '10px', marginLeft: 'auto',
                marginRight: 'auto'}} 
                type="date"
                name="challenge_date"
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
              />
            </label>
          </div>
        </div>
        <div className='addChallengeBtn'>
          <Button 
            style={{marginTop: '5px', margin: '.5rem', color: 'white', background: '#054f95'}}
            variant='contained' 
            color='default'
            onClick={this.createChallenges}>
              Add Challenge
          </Button>
        </div>
    </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateChallenges);