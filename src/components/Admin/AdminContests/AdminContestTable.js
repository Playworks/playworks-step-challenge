import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import AdminContestsItem from '../AdminContestsItem/AdminContestsItem';

class AdminContestTable extends Component {

  render() {
    return (
        <div>
        <table className='adminContestTable'>
          <thead>
              <tr>
              <th>Contest</th>
              <th>Start Date</th>
              <th>End Date</th>
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
