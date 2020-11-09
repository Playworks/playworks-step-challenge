import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './JoinTeam.css';
import SearchBar from "material-ui-search-bar";
// import placeholder image
import Placeholder from '../../../images/placeholder-square.png';
// import material ui
import { Button, FormHelperText, Typography } from '@material-ui/core';

class JoinTeam extends Component {
  state = {
    value: ''
  };


  render() {
    return (
      <div className='teamForm'>
        <Typography variant='h5'>Join a Team</Typography>
        <center>
          <SearchBar
            value={this.state.value}
            onChange={(newValue) => this.setState({ value: newValue })}
            onRequestSearch={() => this.filterByInput(this.state.value)}/>
            <FormHelperText>Search for a team or teammate</FormHelperText>
            <img style={{marginTop: '1rem'}} src= { Placeholder } />
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              size= 'large'
              onClick={() => {this.props.history.push('/home')}}>
              Join Team
            </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(JoinTeam);