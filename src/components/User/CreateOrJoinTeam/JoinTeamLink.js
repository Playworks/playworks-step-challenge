import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Typography } from '@material-ui/core';

function JoinTeamLink (props) {

  return (
    <div className='joinTeamLink'>
        <i class="fas fa-users fa-5x" ></i>
        <Typography variant='h5' style={{marginTop: 30}}>Join Team</Typography>
    </div>
  );
}

export default connect(mapStoreToProps)(JoinTeamLink);
