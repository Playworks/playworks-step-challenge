import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Typography } from "@material-ui/core";
import moment from 'moment';

function ChallengeDateItem(props) {
    // toggles visibility of current date and an input for a date
  const [set, isSet] = useState(true);
  // current date as passed down by parent ChallengesGridItem is set to state
  const [date, setDate] = useState(props.date);
  // toggles back to original view and fetch updated challenges
  const doBoth = () => {
      isSet(!set);
      props.fetch();
  }
  
  return (
    <>
        {set && <Typography variant='subtitle1' onClick={() => isSet(!set)}>{moment(props.date).format('MMMM Do YYYY')}</Typography>}
        {!set && <><p>Currently set date: {moment(props.date).format('MMMM Do YYYY')}</p>
                <input
                  style={{display: 'block', color: 'rgb(118, 118, 118)', padding: '10px', marginLeft: 'auto',
                  marginRight: 'auto'}} 
                  type="date"
                  name="challenge_date"
                //   value={props.date}
                  onChange={props.changeDate}
                  onBlur={() => doBoth()}
              />
              </>}
    </>
  );
}

export default connect(mapStoreToProps)(ChallengeDateItem);
