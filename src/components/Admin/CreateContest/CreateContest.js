import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateContest.css';
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

class CreateContest extends Component {
  state = {
      name: '',
      start_date: '',
      end_date: '',
      image: ''
    };
    
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

  selectImage = () => {
    console.log('in selectImage')
  }

  render() {
    return (
      <div className="createContestFormPanel">
        
        <center>
          <Typography variant='h5'>Create Contest</Typography>
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
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                </Grid>
            </Grid>
          </div>

          <div className='contestImage'>
            <Typography variant='h6'>Contest Logo</Typography>
              { this.state.image === '' ? (
                <img style={{width: '300px'}} src= { Placeholder } /> 
                ) : ( 
                <img style={{width: '300px'}} src= { this.state.image } /> 
              )}
          </div>
          <div className='chooseImageBtn'>
            <Button 
              variant='contained' 
              color='default'
              onClick={this.selectImage}>Choose Image
            </Button>
          </div>
          <div className='createContestBtn'>
              <Button variant='contained' 
                color='primary'
                size= 'large'
                style={{margin: '.5rem'}}
                onClick={this.createContest}>
                Create Contest
              </Button> 
          </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateContest);