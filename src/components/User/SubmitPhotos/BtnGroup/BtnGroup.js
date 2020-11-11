import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import './BtnGroup.css';
import { Button } from '@material-ui/core';


class CancelSubmitBtnGroup extends Component {

    handleCancel = () => {
        console.log('in handleCancel')
      }
    
      handleSubmit = () => {
        console.log('in handleSubmit')
      }

  render() {
    return (
        <div className='cancelSubmitBtnGroup'>
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
        );
    }
}

export default connect(mapStoreToProps) (withRouter (CancelSubmitBtnGroup));