import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import moment from 'moment';
import mapStoreToProps from '../../../redux/mapStoreToProps';



class ImageUpload extends Component {

    handleFinishedUpload = info => {
        console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.props.dispatch({
            type: 'CREATE_PHOTOS',
            payload: {
              fileUrl: info.fileUrl,
              date: moment(Date()).format(),
              challenges_id: this.props.store.dailyChallenges[0]
            },
          });
      }

    render() {
        

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = `http://playworks-step-challenge.s3.amazonaws.com`;

        return (
            <DropzoneS3Uploader
                onFinish={this.handleFinishedUpload}
                s3Url={s3Url}
                maxSize={1024 * 1024 * 5}
                upload={uploadOptions}
            />
        )
    }
}

export default connect(mapStoreToProps)(ImageUpload);