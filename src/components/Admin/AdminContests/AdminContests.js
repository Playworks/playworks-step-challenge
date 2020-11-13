import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './AdminContests.css';
import ContestsGrid from '../ContestsGrid/ContestsGrid';
import CreateContest from '../CreateContest/CreateContest';
import AdminContestsItem from '../AdminContestsItem/AdminContestsItem';
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
      type: 'FETCH_CONTEST'
    });
  }


  render() {
    return (
        <div>
            <Nav/>
            <Typography variant='h5'>{this.state.heading}</Typography>
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
                            key={item.id}
                            contest={item}
                        />
                        )}
                    </tbody>
                    </table>
                </center>
            </div>
            {/* {this.props.store.contest.map((item, i) => 
                <ContestsGrid 
                key={item.id}
                contest={item} />
                )} */}
                <CreateContest/>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminContests);