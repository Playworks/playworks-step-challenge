import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AdminContests.css';
import ContestsGrid from '../ContestsGrid/ContestsGrid';
import CreateContest from '../CreateContest/CreateContest';
import Nav from '../../Nav/Nav.js';
import { Typography } from '@material-ui/core';

class AdminContests extends Component {
  state = {
    heading: 'Contests',
    description: '',
    date: ''
  };

  componentDidMount() {
    this.setContests();
  }

  setContests = () => {
    this.props.dispatch({
      type: 'FETCH_CONTESTS'
    });
  }

  render() {
    return (
        <div>
            <Nav/>
            <Typography variant='h5'>{this.state.heading}</Typography>
            {/* {this.props.store.contest.map((item, i) => 
            <ContestsGrid 
              key={item.id}
              contest={item} />
              )} */}
              <ContestsGrid/>
            <CreateContest/>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContests);