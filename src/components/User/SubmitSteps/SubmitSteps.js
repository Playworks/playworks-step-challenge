import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';
import './SubmitSteps.css';
import Nav from '../../Nav/Nav.js';
import Footer from '../../Footer/Footer.js';
// import material ui
import { Button, TextField } from '@material-ui/core';
import moment from 'moment';


class SubmitSteps extends Component {

  state = {
    steps: '',
    date: '',
  };

handleChangeFor = (propertyName) => (event) => {
  this.setState({
    [propertyName]: event.target.value,
  });
};

submitSteps = (event) => {
    event.preventDefault();
    this.props.dispatch({
        type: 'CREATE_STEPS',
        payload: {
          steps: this.state.steps,
          date: this.state.date,
        },
      });
    this.props.history.push('/home');
  };

handleCancel = () => {
    this.setState({
        steps: '',
        date: '',
      });
    this.props.history.push('/home');
}


  render() {
    return (
      <div><Nav />
      <div>
        <center>
        <TextField id="outlined-basic" label="Number of steps" variant="outlined"
        onChange={this.handleChangeFor('steps')}></TextField>
        <div>
          <input 
              style={{display: 'block'}} 
              type="date" 
              value={this.state.date} 
              id="date" 
              name="date"
              onChange={this.handleChangeFor('date')}>
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
            onClick={this.submitSteps}>
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