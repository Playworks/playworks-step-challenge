import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengesItem from '../ChallengesItem/ChallengesItem';
import './Challenges.css';

class Challenges extends Component {
  state = {
    heading: 'Challenges',
    date: Date(),
  };

  componentDidMount() {
    this.setChallenges();
    this.setDate();
  }

  setChallenges = () => {
    this.props.dispatch({
      type: 'FETCH_CHALLENGES'
    });
  }

  setDate = () => {

  }

  render() {
    
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {this.props.store.challenges.map((challenge, i) => 
                <ChallengesItem
                  key={challenge.id}
                  challenge={challenge}
                />
              )}
        {/* <table>
          <thead>
              <tr>
                  <th>Challenge Name</th>
                  <th>Challenge Description</th>
                  <th>Challenge Date</th>
              </tr>
          </thead>
          <tbody>
          {this.props.store.challenges.map((challenge, i) => 
                <ChallengesItem
                  key={challenge.id}
                  challenge={challenge}
                />
              )}
          </tbody>
        </table> */}
        {/* {this.props.store.challenges.map((challenge, i) => 
                this.props.store.challenge.date === this.getDate() ? <h2>this.props.store.challenge.name</h2> : ''
              )} */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Challenges);