import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Typography } from "@material-ui/core";
import moment from 'moment';
// allows user to change the challenge date
function ChallengeDateItem(props) {
// handles change of date
  const edit = (event) => {
    props.isDate(event.target.value)
}
  return (
    <div>
      {props.status && <Typography variant='subtitle1'>{moment(props.date).format('MMMM Do YYYY')}</Typography>}
      {!props.status && <>
        <input
          style={{display: 'block', color: 'rgb(118, 118, 118)', padding: '10px', marginLeft: 'auto',
          marginRight: 'auto'}} 
          type="date"
          name="challenge_date"
          onChange={edit}
          disabled={props.status}
        />
        <Typography style={{textAlign: 'center'}} variant='body2'>Currently set date: {moment(props.date).format('MMMM Do YYYY')}</Typography>
        </>}
    </div>
  );
}

export default connect(mapStoreToProps)(ChallengeDateItem);