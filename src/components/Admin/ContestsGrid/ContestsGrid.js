import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import './ContestsGrid.css';
import ContestsGridItem from '../ContestsGridItem/ContestsGridItem';

class ContestsGrid extends Component {
  state = {
    heading: 'Contests Grid',
  };

  render() {
    return (
      <div className='ContestsGrid'>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <ContestsGridItem
                key={this.props.contest.id}
                contest={this.props.contest}
                />
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContestsGrid);