import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import AdminContestsItem from '../AdminContestsItem/AdminContestsItem';
import { Typography } from '@material-ui/core';

class AdminContestTable extends Component {

  render() {
    return (
        <div>
        <table className='adminContestTable'>
          <thead>
              <tr>
                <th><Typography variant='h6'>Contest</Typography></th>
                <th><Typography variant='h6'>Start Date</Typography></th>
                <th><Typography variant='h6'>End Date</Typography></th>
                <th></th>
              </tr>
          </thead>
          <tbody>
            {this.props.store.contest.map((item, i) => 
              <AdminContestsItem
                  key={item.id}
                  contest={item}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContestTable);
