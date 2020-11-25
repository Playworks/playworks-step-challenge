import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import material ui
import { Button } from '@material-ui/core';
// import sweet alert
import swal from 'sweetalert';

class ImageUpload extends Component {
  state = {
    fileUrl: '',
    date: '',
    challenges_id: '',
  };

  // function is validation for submitting photo
  confirmationSubmitPhoto = (event) => {
    if(this.state.fileUrl === ''){
      swal(`Please select a photo to upload`);
    } else {
      this.submitPhoto(event);
    }
  };

  // function sets states to empty strings and pushes user back
  handleCancel = () => {
    this.setState({
      fileUrl: '',
      date: '',
      challenges_id: ''
    });
    this.props.history.goBack();
  };

  // function runs upon file image upload finshing
  handleFinishedUpload = info => {
    this.setState({
      fileUrl: info.fileUrl,
      date: moment(Date()).format(),
      challenges_id: this.props.store.dailyChallenges[0],
    });
  };

  // function sends photo creation data to saga listening for 'CREATE_PHOTOS'
  submitPhoto = (event) => {
    event.preventDefault();
    this.props.dispatch({
        type: 'CREATE_PHOTOS',
        payload: {
          fileUrl: this.state.fileUrl,
          date: this.state.date,
          challenges_id: this.state.challenges_id,
          start_of_today: moment().startOf('day').format(),
          end_of_today: moment().endOf('day').format()
        },
      });
    this.props.history.push('/home');
  };

  render() {
      const uploadOptions = {
          // signingUrlQueryParams: {uploadType: 'avatar'},
      }

      const s3Url = `http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com`;

    return (
      <div>
        <DropzoneS3Uploader
          onFinish={this.handleFinishedUpload}
          s3Url={s3Url}
          maxSize={1024 * 1024 * 5}
          upload={uploadOptions}
          className="previewImage"
        >
        </DropzoneS3Uploader>
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
            style={{margin: '.5rem', color: 'white', background: '#054f95'}} 
            onClick={this.confirmationSubmitPhoto}>
              Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ImageUpload));