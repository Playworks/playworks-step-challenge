import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ContentEditable from 'react-contenteditable';

function EditUserSteps(props) {
  const [status, isEditable] = useState(true);

  // saves updated step log and toggles back to not editable
  const saveAndToggle = () => {
    console.log('props', props.store.currentPerson);
    props.save(props.data);
    props.reload()
    unToggle();
  }

  const unToggle = () => {
    isEditable(!status)
  }

  const reload = (value) => {
    props.dispatch({
      type: 'FETCH_LOGS',
      payload: value
    })
  }
  
    return (
    <tr>
        <td>{props.date}</td>
        <td>
          <ContentEditable
          className={status ? null : 'editUserStepstd'}
          data={props.data}
          html={String(props.steps)}
          onChange={props.edit}
          disabled={props.status}
          />
        </td>
        <td>
            {status === false && <button onClick={() => saveAndToggle()}>Save</button>}
            {status === true && <button onClick={() => unToggle()}>Edit</button>}
        </td>
        <td>
          <button onClick={() => props.delete(props.data)}>Delete</button>
        </td>
    </tr>
  );
}

export default connect(mapStoreToProps)(EditUserSteps);