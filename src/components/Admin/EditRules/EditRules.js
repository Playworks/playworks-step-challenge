import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Nav from '../../Nav/Nav.js';
import './EditRules.css';

class EditRules extends Component {
  state = {
    fileUrl: '',
  };

  // Function runs upon finish of file upload
  handleFinishedUpload = info => {
    this.setState({
      fileUrl: info.fileUrl,
    });
  };

  // function sends uploaded file to saga listening for 'CREATE_RULES' then sends user to adminrules
  submitRules = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_RULES',
      payload: {
        fileUrl: this.state.fileUrl,
      }
    });
    this.props.history.push('/adminrules');
  };

  handleCancel = () => {
    this.setState({
      fileUrl: '',
    });
    this.props.history.push('/adminrules');
  }

  render() {
    const uploadOptions = {
        // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = `http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com`;

    return (
      <div>
        <Nav />
        <div className='adminRulesAndFaqS3Uploader'>
          <DropzoneS3Uploader
            onFinish={this.handleFinishedUpload}
            s3Url={s3Url}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
          />
        </div>
        <div className='cancelSubmitBtnGroup'>
          <Button 
            variant='contained' 
            color='default'
            size= 'large'
            style={{margin: '.5rem'}}
            onClick={this.handleCancel}>
              Cancel
          </Button>    
          <Button 
            variant='contained' 
            color='primary'
            size= 'large'
            style={{margin: '.5rem'}}
            onClick={this.submitRules}>
              Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(withRouter(EditRules));