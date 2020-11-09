import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateTeam.css';

class CreateTeam extends Component {
  state = {
    heading: 'Create Team',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/home');
            }}
          >
            Submit New Team
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);