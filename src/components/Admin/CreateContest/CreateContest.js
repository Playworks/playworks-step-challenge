import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateContest.css';
// import placeholder image
import { Button, TextField, Typography } from '@material-ui/core';

class CreateContest extends Component {
  state = {
      name: '',
      start_date: '',
      end_date: '',
      image: ''
    };
    
  // Function creates contests, sends name, start and end date to saga. 
  createContest = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_CONTEST',
      payload: {
        name: this.state.name,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    });
    this.setState({
      name: '',
      start_date: '',
      end_date: ''
    });
  }; // end createContest

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });                
  };

  render() {
    return (
      <div className='adminCreateContestContainer'>
        <div className='adminCreateContestHeader'>
          <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>Create Contest</Typography>
        </div>
        <div className='adminContestNameInput'>
          <TextField id="outlined-basic" 
            style={{width: '100%'}}
            label="Contest Name" 
            variant="outlined" 
            value={this.state.name}
            required 
            onChange={this.handleInputChangeFor('name')}>
          </TextField>
        </div>
        <div className='adminCreateContestStartEndDates'>
          <div className='startDate'>
            <label htmlFor="start_date">
              Start Date:
              <input
                style={{display: 'block', color: 'rgb(118, 118, 118)', padding: '10px'}} 
                type="date"
                name="start_date"
                value={this.state.start_date}
                required
                onChange={this.handleInputChangeFor('start_date')}
              />
            </label>
          </div>
          <div className='endDate'>
            <label htmlFor="end_date">
              End Date:
              <input
                style={{display: 'block', color: 'rgb(118, 118, 118)', padding: '10px'}} 
                type="date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.handleInputChangeFor('end_date')}
              />
            </label>
          </div>
        </div>
        <div className='createContestBtn'>
          <Button variant='contained' 
            color='primary'
            size= 'large'
            style={{margin: '.5rem', color: 'white', background: '#054f95'}}
            onClick={this.createContest}>
              Create Contest
          </Button> 
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateContest);