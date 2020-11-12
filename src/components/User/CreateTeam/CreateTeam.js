import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './CreateTeam.css';
import Logo from '../../../images/PW-hor-logo.png';
// import material ui
import { 
  Button, TextField, Typography } from '@material-ui/core';
// import sweetalert
import swal from 'sweetalert';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

class CreateTeam extends Component {

  state = {
    team_name: '',
    team_photo: '',
    company_name: '',
  }

  componentDidMount() {
    // Dispatching fetch contest on this page load so that users have access contest for drop down.
    this.props.dispatch({ type: 'FETCH_CONTEST'});
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
    this.setState({
      team_photo: info.fileUrl
    });
  };

  // Function dispatches info to create team to saga Listening for 'CREATE_TEAM'
  createTeam = () => {
    if(this.state.team_name === ''){
      swal(`Please enter a team name`);
    }
    else if(this.state.company_name === ''){
      swal(`Please enter company name`);
    }
    else{
      swal({
        title: "Is the submitted info correct?",
        icon: "info",
        buttons: {
          cancel: "No",
          yes: true,
        }
      }).then(isCorrect => {
        if(isCorrect){
          this.props.dispatch({
            type: 'CREATE_TEAM',
            payload: {
              team_name: this.state.team_name,
              team_photo: this.state.team_photo,
              company_name: this.state.company_name,
            }
        });
        swal({
          title: "Your Team has been created!",
          icon: "success"
        }).then(() => {
          this.setState({
            team_name: '',
            team_photo: '',
            company_name: '',
          });
          this.props.history.push('/home');
        })
        }
      })
    };
  };

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = `http://playworks-step-challenge.s3.amazonaws.com`;

    return (
      <div>

        <img className='createPageLogo' src= {Logo}/>

        <div className='teamForm'>
          <Typography variant='h5'>Create a Team</Typography>
          
          <div className='createTeamName'>
            <TextField 
              id="outlined-basic" 
              label="Team name" 
              variant="outlined"
              style={{width: '100%'}}
              onChange={this.handleInputChangeFor('team_name')}
            />
          </div>
          <div>
          <TextField 
            id="outlined-basic" 
            label="Company Name" 
            variant="outlined"
            style={{width: '100%'}}
            onChange={this.handleInputChangeFor('company_name')}
          />
          </div>
          <div className='dropzoneUploader'>
            <DropzoneS3Uploader
                  onFinish={this.handleFinishedUpload}
                  s3Url={s3Url}
                  maxSize={1024 * 1024 * 5}
                  upload={uploadOptions}
            />
          </div>
          <center>
            <Button variant='contained' 
              color='primary'
              style={{marginTop: '2rem'}} 
              onClick={this.createTeam}>
              Submit
            </Button>
          </center>
        </div>
        <div id='footer'>
        <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {this.props.history.push('/createorjointeam')}}>
            Go Back</button>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {this.props.history.push('/jointeam')}}>
            Join Team</button>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
            Log Out
          </button>

        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CreateTeam);