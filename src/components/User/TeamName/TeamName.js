import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Typography } from '@material-ui/core';


function TeamName(props) {

  console.log('props', props.store.teamDetails[0] && props.store.teamDetails[0].name);
  

  return (
      <Typography style={{color: '#4d4d4f', fontFamily: 'Poppins'}} 
        variant='h4'>{props.store.teamDetails[0] && props.store.teamDetails[0].name}</Typography>
  );
}

export default connect(mapStoreToProps)(TeamName);