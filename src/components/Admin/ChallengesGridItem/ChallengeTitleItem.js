import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ContentEditable from 'react-contenteditable';

// allows user to edit title on toggled edit status
function ChallengeTitleItem(props) {
// handles change in title
  const edit = (event) => {
    props.isTitle(event.target.value)
  }
    return (
    <>
      <ContentEditable
        html={props.title}
        onChange={edit}
        disabled={props.status}
      />
    </>
  );
}

export default connect(mapStoreToProps)(ChallengeTitleItem);