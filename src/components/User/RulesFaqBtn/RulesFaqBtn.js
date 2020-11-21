import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class RulesFaqBtn extends Component {

  render() {
    return (
      <div>
        <Button 
          variant='contained' 
          color='default'
          size= 'large'>
            Rules & FAQ
        </Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RulesFaqBtn);
