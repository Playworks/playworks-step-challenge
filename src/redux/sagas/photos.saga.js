import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';


// Function sends get request to get all challenge photos and puts in reducer listening for 'SET_CHALLENGE_PHOTOS'
function* fetchChallengePhotosSaga(action){    
    let response = yield axios({
        method: 'GET',
        url: `/api/challengephotos`,
    });
    console.log('CHALLENGEPHOTOS', response.data);
      
    yield put({
        type: 'SET_CHALLENGE_PHOTOS',
        payload: response.data
    });
  };

  // Function sends photo creation data
function* createPhotosSaga(action) {
    try{
        console.log('ACTION PAYLOAD', action.payload);    
        let response = yield axios({
            method: 'POST',
            url: '/api/photos',
            data: action.payload
        });
    }
    catch (error) {
    console.log('CREATE PHOTOS RESPONSE:', error);
    if (error.response.status === 400) {
        alert('AHHHHHHHHHHH!')
        // swal({
        //     title: `You've already submitted a photo for the daily challenge today!`,
        //     text: `Please try again tomorrow!`,
        //     buttons: {
        //       cancel: "Ok",
        //     }
        // })
    }
    }
};

    // Function runs a delete request with action.payload.photo_id upon success throws back into fetch_captain_team_photos with action.payload.team_id
function* denyPhotosSaga(action){  
    console.log('this is action dot payload DAVID ', action.payload)  ;
    let response = yield axios({
        method: 'DELETE',
        url: `/api/photos/${action.payload.photo_id}`,
    });
    console.log('DELETEPHOTOS', response.data); 
    yield put({
        type: 'FETCH_CAPTAIN_TEAM_PHOTOS',
        payload: action.payload.team_id
    });     
    };

    // Function runs a put request with action.payload.photo_id upon success throws back into fetch_captain_team_photos with action.payload.team_id
function* approvePhotosSaga(action){
    console.log('in approvephotos this is action.payload', action.payload);    
    let response = yield axios({
        method: 'PUT',
        url: `/api/photos/${action.payload.photo_id}`,
    });
    console.log('APPROVEPHOTOS', response.data);
    yield put({
        type: 'FETCH_CAPTAIN_TEAM_PHOTOS',
        payload: action.payload.team_id
    });       
  };

function* photosSaga() {
    yield takeLatest('CREATE_PHOTOS', createPhotosSaga);
    yield takeLatest('FETCH_CHALLENGE_PHOTOS', fetchChallengePhotosSaga);
    yield takeLatest('DELETE_PHOTOS', denyPhotosSaga);
    yield takeLatest('APPROVE_PHOTOS', approvePhotosSaga);
};

export default photosSaga;