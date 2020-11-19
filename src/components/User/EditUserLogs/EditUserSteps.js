import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import ContentEditable from 'react-contenteditable';

function EditUserSteps(props) {
  const [status, isEditable] = useState(true);
  const [initialSteps, isSteps] = useState(props.steps);
  const [steps, changeSteps] = useState(props.steps);
  // saves updated step log and toggles back to not editable
  const saveAndToggle = (logId, logSteps) => {
      props.save(logId, logSteps);
      isEditable(!status);
  }
  
    return (
    <tr>
        <td>{props.date}</td>
        <td>
        <ContentEditable
        className='editUserStepstd'
        data={props.data}
        html={String(props.steps)}
        onChange={props.edit}
        disabled={status}
        />
        </td>
        <td>
            {!status && <button onClick={() => props.save(props.data)}>Save</button>}
            {status && <button onClick={() => isEditable(!status)}>Edit</button>}
            <button onClick={() => props.delete(props.data)}>Delete</button>
        </td>
    </tr>
  );
}

export default connect(mapStoreToProps)(EditUserSteps);