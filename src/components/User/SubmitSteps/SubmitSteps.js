import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import components
import Nav from '../../Nav/Nav.js';
import ScrollingFooter from '../../ScrollingFooter/ScrollingFooter';
// import material ui
import { Button, Card, TextField, Typography } from '@material-ui/core';
// import sweet alert
import swal from 'sweetalert';
// import css
import './SubmitSteps.css';

class SubmitSteps extends Component {
  state = {
    steps: '',
    date: '',
  };

  // validation function 
  confirmationSubmitSteps = (event) => {
    if(this.state.steps === ''){
      swal(`Please enter steps`);
    }
    else if(this.state.date === ''){
      swal(`Please select a date`);
    }
    else{
      swal({
        title: "Is the submitted information correct?",
        text: `Steps: ${this.state.steps} 
            Date: ${this.state.date.split( 'T' )[0]}`,
        icon: "info",
        buttons: {
          cancel: "No",
          yes: true,
        }
      }).then(isCorrect => {
        if(isCorrect){
          this.submitSteps(event);
          swal({
            title: "You're steps have been logged!",
            icon: "success"
          }).then(() => {
            this.props.history.goBack();
          })
        }
        else{
          swal(`No steps were logged`)
        }
      })
    }
  };

  handleChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // function sets steps and date to empty strings and sends user back.
  handleCancel = () => {
    this.setState({
      steps: '',
      date: '',
    });
    this.props.history.goBack();
  };

  // function sends step creation data to saga listening for CREATE_STEPS
  submitSteps = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_STEPS',
      payload: {
        steps: this.state.steps,
        date: this.state.date,
      },
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <div>
          <center>
            <div className='submitStepsSection'>
              <Card style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
                <div className='submitStepsHeadline'>
                  <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} variant='h5'>Submit Steps</Typography>
                </div>
                <div className='submitStepsInput'>
                  <TextField id="outlined-basic" type="number" label="Number of steps" variant="outlined" onChange={this.handleChangeFor('steps')}></TextField>
                </div>
                <div className='dateInputField'>
                  <input 
                    style={{display: 'block', width: 175, color: 'rgb(118, 118, 118)', padding: '10px'}} 
                    type="date" 
                    value={this.state.date} 
                    id="date" 
                    name="date"
                    onChange={this.handleChangeFor('date')}>
                  </input>
                </div>      
              </Card>
            </div>
            <div className='stepsSubmitCancelBtns'>
              <Button 
                variant='contained' 
                color='default'
                size= 'large'
                style={{margin: '.5rem'}}
                onClick={this.handleCancel}>
                  Cancel
              </Button>    
              <Button 
                variant='contained' 
                color='primary'
                size= 'large'
                style={{margin: '.5rem', color: 'white', background: '#054f95'}}
                onClick={this.confirmationSubmitSteps}>
                  Submit
              </Button>
            </div>
          </center>
        </div>
        <ScrollingFooter />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(SubmitSteps));