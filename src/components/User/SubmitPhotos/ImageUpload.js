import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './BtnGroup/BtnGroup.css';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class ImageUpload extends Component {

    state = {
        fileUrl: '',
        date: '',
        challenges_id: '',
      };

    handleFinishedUpload = info => {
        console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.setState({
            fileUrl: info.fileUrl,
            date: moment(Date()).format(),
            challenges_id: this.props.store.dailyChallenges[0],
          });
      }

    submitPhoto = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'CREATE_PHOTOS',
            payload: {
              fileUrl: this.state.fileUrl,
              date: this.state.date,
              challenges_id: this.state.challenges_id
            },
          });
        this.props.history.push('/home');
      };

    handleCancel = () => {
        this.setState({
            fileUrl: '',
            date: '',
            challenges_id: ''
          });
          this.props.history.goBack();
    }

    render() {
        

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = `http://playworks-step-challenge.s3.amazonaws.com`;

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
                    <Button variant='contained' 
                        color='default'
                        size= 'large'
                        style={{margin: '.5rem'}}
                        onClick={this.handleCancel}>
                        Cancel
                    </Button>    
                    <Button variant='contained' 
                        color='primary'
                        size= 'large'
                        style={{margin: '.5rem'}}
                        onClick={this.submitPhoto}>
                        Submit
                    </Button>
                </div>
            </div>
            
        )
    }
}

export default connect(mapStoreToProps)(withRouter(ImageUpload));