import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Typography } from '@material-ui/core';

function CreateTeamLink(props) {

  return (
    <div className='createTeamLink'>
        <GroupAddIcon 
            style={{ width: 110, height: 110, display: 'block' }} 
            fontSize='large' 
            />
        <Typography variant='h5'>Create Team</Typography>
    </div>
  );
}

export default connect(mapStoreToProps)(CreateTeamLink);
