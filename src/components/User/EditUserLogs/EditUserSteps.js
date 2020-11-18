import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ContentEditable from 'react-contenteditable';

function EditUserSteps(props) {
  const [status, isEditable] = useState(true);
  const [initialSteps, isSteps] = useState(props.steps);
  const [steps, changeSteps] = useState(props.steps);
  // allows captain to edit users steps
  const edit = (event) => {
      console.log('event', event.target.value);
      changeSteps(event.target.value);
  }
  // saves updated step log and toggles back to not editable
  const saveAndToggle = (logId, logSteps) => {
      props.save(logId, logSteps);
      isEditable(!status);
  }
  // only shows positive step logs
  if(props.steps > 0) { 
    return (
    <tr>
        <td>{props.date}</td>
        <td>
        <ContentEditable
        className='editUserStepstd'
        data={props.data}
        html={String(steps)}
        onChange={edit}
        disabled={status}
        />
        </td>
        <td>
            {!status && <button onClick={() => saveAndToggle(props.data, steps)}>Save</button>}
            {status && <button onClick={() => isEditable(!status)}>Edit</button>}
            <button onClick={() => props.delete(props.data)}>Delete</button>
        </td>
    </tr>
  );  
  } else {
      return(<></>)
  }
}

export default connect(mapStoreToProps)(EditUserSteps);