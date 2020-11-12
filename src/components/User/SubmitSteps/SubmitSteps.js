import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import './SubmitSteps.css';
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';
// import material ui
import { Button, TextField } from '@material-ui/core';

class SubmitSteps extends Component {
  state = {
    date: '',
  };

  handleCancel = () => {
    console.log('in handleCancel')
    this.props.history.push('/home');
  }

  handleSubmit = () => {
    console.log('in handleSubmit')
    this.props.history.push('/home');
  }

  render() {
    return (
      <div><Nav />
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
      <Footer />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(SubmitSteps));