import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Grid, Typography } from '@material-ui/core';
import moment from 'moment';

class AdminContestsItem extends Component {
  state = {
    heading: 'AdminContestsItem',
  };

  render() {
    console.log('This Contest', this.props.contest);
    
    return (
      <tr>
        <td>
            {this.props.contest.name}
        </td>
        <td>
            {moment(this.props.contest.start_date).format('MMMM Do YYYY')}
        </td>
        <td>
            {moment(this.props.contest.end_date).format('MMMM Do YYYY')} 
        </td>
        <td>
            <button>
              Edit
            </button>
        </td>
      </tr>
    );
  }
}

export default connect(mapStoreToProps)(AdminContestsItem);