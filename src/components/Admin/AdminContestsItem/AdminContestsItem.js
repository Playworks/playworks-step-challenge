import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';

class AdminContestsItem extends Component {
  editContestAndSetCurrentContest = (value) => {
    this.editContest(value);
    this.setCurrent(value);
  }

  // This function will be called with the Edit button
  // and will set the reduxState for editing this contest
  // and it's photos
  setContestsPhotos = () => {
    this.props.dispatch({
      type: 'FETCH_CONTEST_PHOTOS'
    });
  }

  editContest = (value) => {
    console.log('edit contest button', value);
    let contestToEdit = value
    this.props.dispatch({
      type: 'FETCH_CONTEST_DETAILS',
      payload: contestToEdit
    })
    this.props.history.push('/contestdescription')
  }

  setCurrent = (value) => {
    this.props.dispatch({
      type: "SET_CURRENT_CONTEST",
      payload: value
    })
  }

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
            <button onClick={() => this.editContestAndSetCurrentContest(this.props.contest.id)}>
              Edit Contest
            </button>
        </td>
      </tr>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AdminContestsItem));