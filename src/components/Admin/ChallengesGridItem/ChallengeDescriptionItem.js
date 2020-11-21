import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ContentEditable from 'react-contenteditable';

// allows user to change challenge description
function ChallengeDescriptionItem(props) {
// handles change of challenge description
  const edit = (event) => {
    props.isDescription(event.target.value)
  }
    return (
    <>
      <ContentEditable
        html={props.description}
        onChange={edit}
        disabled={props.status}
      />
    </>
  );
}

export default connect(mapStoreToProps)(ChallengeDescriptionItem);