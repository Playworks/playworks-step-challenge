import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitPhotos.css';
// import material ui
import { Button, TextField } from '@material-ui/core';


class SubmitPhotos extends Component {
  state = {
    date: '',
  };

  handleChangeFor = ( event, propertyName ) => {
    // logic for change
  }

  submitSteps = () => {
    // logic to submit steps
    this.goHome();
  }

  goHome = () => {
    this.history.push('/home')
  }

  render() {
    return (
      <div>
        <center>
        <TextField id="outlined-basic" label="Number of steps" variant="outlined"
        onChange={ ( event ) => this.handleChangeFor ( event, 'steps' ) }></TextField>
        <div>
          <input 
              style={{display: 'block'}} 
              type="date" 
              value={this.state.date.split( 'T' )[0]} 
              id="date" 
              name="date"
              onChange={ ( event ) => this.handleChangeFor ( event, 'date' ) }>
          </input>
        </div>      
        <div style={{marginTop: '2rem'}}>
          <Button variant='contained' 
            color='default'
            size= 'large'
            onClick={() => {this.history.push('/home')}}>
            Cancel
          </Button>    
          <Button variant='contained' 
            color='primary'
            size= 'large'
            onClick={this.submitSteps}>
            Submit
          </Button>
        </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SubmitPhotos);