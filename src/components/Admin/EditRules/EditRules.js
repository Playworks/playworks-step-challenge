// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import mapStoreToProps from '../../../redux/mapStoreToProps';
// import { Grid } from "@material-ui/core";
// import Placeholder from '../../../images/placeholder-vertical.jpg';
// import EditFAQ from '../EditFAQ/EditFAQ.js';
// import './EditRules.css';
// import AdminNav from '../../Admin/AdminNav/AdminNav.js';

// class EditRules extends Component {
//   state = {
//     heading: 'Edit Rules',
//   };

//   render() {
//     return (
//       <div>
//         <AdminNav />
      
//       <Grid container direction="column" alignItems="center" className="rulesFaq">
//       <Grid item>
//         <h2>Rules</h2>
//       </Grid>
//       <Grid item className="pdf">
//         <img  src={Placeholder} />
//       </Grid>
//       <Grid item>
//         <button>Delete</button> 
//       </Grid>
//       <EditFAQ />
//     </Grid></div>
//     );
//   }
// }

// export default connect(mapStoreToProps)(EditRules);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './EditRules.css';


class EditRules extends Component {

    state = {
        fileUrl: '',
      };

    handleFinishedUpload = info => {
        console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.setState({
            fileUrl: info.fileUrl,
          });
      }

    submitRules = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'CREATE_RULES',
            payload: {
              fileUrl: this.state.fileUrl,
            },
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
                />
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
                        onClick={this.submitRules}>
                        Submit
                    </Button>
                </div>
            </div>
            
        )
    }
}

export default connect(mapStoreToProps)(withRouter(EditRules));