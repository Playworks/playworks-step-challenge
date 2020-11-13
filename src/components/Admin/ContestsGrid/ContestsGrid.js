import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import AdminContestsItem from '../AdminContestsItem/AdminContestsItem';
import { Grid } from '@material-ui/core';
import './ContestsGrid.css';

class ContestsGrid extends Component {
  state = {
    heading: 'Contests Grid',
  };

  render() {
    return (
      <div className='ContestsGrid'>
        {/* <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <AdminContestsItem
                key={this.props.contest.id}
                contest={this.props.contest}
                />
            </Grid>
        </Grid> */}
        <div>
          <center>
            <table>
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
                    key={this.props.contest.id}
                    contest={this.props.contest}
                  />
                )}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestsGrid);