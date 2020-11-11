import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './SubmitSteps.css';
// import material ui
import { Button, TextField } from '@material-ui/core';

class SubmitSteps extends Component {
  state = {
    date: '',
  };

  handleCancel = () => {
    console.log('in handleCancel')
  }

  handleSubmit = () => {
    console.log('in handleSubmit')
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
              name="date">
          </input>
        </div>      
        <div style={{marginTop: '2rem'}}>
          <Button variant='contained' 
            color='default'
            size= 'large'
            style={{margin: '.5rem'}}
            onClick={this.handleCancel}>
            Cancel
          </Button>    
          <Button variant='contained' 
            color='primary'
            size= 'large'
            style={{margin: '.5rem'}}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SubmitSteps);