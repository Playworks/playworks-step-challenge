import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Typography } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TeamName(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  console.log('props', props.store.teamDetails[0] && props.store.teamDetails[0].name);
  

  return (
    <Typography variant='h4'>{props.store.teamDetails[0] && props.store.teamDetails[0].name}</Typography>
  );
}

export default connect(mapStoreToProps)(TeamName);