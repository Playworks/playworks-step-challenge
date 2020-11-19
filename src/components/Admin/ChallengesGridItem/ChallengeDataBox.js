import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ChallengeDateItem from './ChallengeDateItem';
import ChallengeTitleItem from './ChallengeTitleItem';
import ChallengeDescriptionItem from './ChallengeDescriptionItem';
import '../ChallengesGrid/ChallengesGrid.css';
import { Typography, Button } from "@material-ui/core";

// function component that holds child component that provide
// title, description, and date of challenge
function ChallengeDataBox(props) {
// toggles edit status of child functions
  const [editable, isEditable] = useState(true);
// sets initial values for title, description, and date
  const [initialTitle] = useState(props.challenge.name);
  const [initialDescription] = useState(props.challenge.description);
  const [date, isDate] = useState(props.challenge.date);
// handles change for challenge info
  const [title, isTitle] = useState(props.challenge.name);
  const [description, isDescription] = useState(props.challenge.description);
  const [initialDate] = useState(props.challenge.date);
// saves changes to challenges and toggles back to not able to edit
  const save = () => {
    console.log('title', initialTitle, title);
    console.log('date', initialDate, date);
    console.log('description', initialDescription, description);
    props.dispatch({
        type: 'UPDATE_CHALLENGE',
        payload: {
            id: props.challenge.id,
            title: title,
            description: description,
            date: date
        }
    })
    isEditable(!editable);
  }
// cancels changes and toggles back to not able to edit
  const cancel = () => {
      isTitle(initialTitle);
      isDescription(initialDescription);
      isDate(initialDate);
      isEditable(!editable);
  }
  return (
    <div>
        <Typography className={editable ? null : 'editAdminChallengeField' } variant="h5">
          <ChallengeTitleItem 
          title={props.challenge.name}
          status={editable}
          isTitle={isTitle}
          />
        </Typography >

        <div className={editable ? null : 'adminEditChallengeDate'}>
          <ChallengeDateItem 
          date={props.challenge.date}
          status={editable}
          isDate={isDate}
          />    
        </div>

        <Typography className={editable ? null : 'editAdminChallengeField' } variant="body2">
        <ChallengeDescriptionItem 
        description={props.challenge.description}
        status={editable}
        isDescription={isDescription}
        />
        </Typography>

        <div className='adminEditChallengeBtn'>
          {editable && 
          <Button variant='contained' 
            color='default'
            size= 'large'
            onClick={() => isEditable(!editable)}>Edit
          </Button>
          }   
        </div>
        {!editable &&
        <div className='adminEditChallengeSaveCancelBtnGroup'>
          <Button variant='contained' color='default' size= 'large'
            onClick={() => cancel()}>Cancel</Button>
          <Button variant='contained' color='primary' size= 'large'
            style={{color: 'white', background: '#054f95', marginLeft: '30px'}} 
            onClick={() => save()}>Save</Button>
        </div>
        }
    </div>
  );
}

export default connect(mapStoreToProps)(ChallengeDataBox);
