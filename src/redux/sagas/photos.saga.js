import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

// Function runs a put request with action.payload.photo_id upon success throws back into fetch_captain_team_photos with action.payload.team_id
function* approvePhotosSaga(action){
  yield axios({
    method: 'PUT',
    url: `/api/photos/${action.payload.photo_id}`,
  });
  yield put({
    type: 'FETCH_CAPTAIN_TEAM_PHOTOS',
    payload: action.payload.team_id
  });       
};

// Function sends photo creation data
function* createPhotosSaga(action) {
  yield axios({
    method: 'POST',
    url: '/api/photos',
    data: action.payload
  });
};

// Function runs a delete request with action.payload.photo_id upon success throws back into fetch_captain_team_photos with action.payload.team_id
function* denyPhotosSaga(action){  
  yield axios({
    method: 'DELETE',
    url: `/api/photos/${action.payload.photo_id}`,
  });
  yield put({
    type: 'FETCH_CAPTAIN_TEAM_PHOTOS',
    payload: action.payload.team_id
  });     
};

// Function sends get request to get all challenge photos and puts in reducer listening for 'SET_CHALLENGE_PHOTOS'
function* fetchChallengePhotosSaga(){    
  let response = yield axios({
    method: 'GET',
    url: `/api/challengephotos`,
  });   
  yield put({
    type: 'SET_CHALLENGE_PHOTOS',
    payload: response.data
  });
};

function* photosSaga() {
  yield takeLatest('APPROVE_PHOTOS', approvePhotosSaga);
  yield takeLatest('CREATE_PHOTOS', createPhotosSaga);
  yield takeLatest('DELETE_PHOTOS', denyPhotosSaga);
  yield takeLatest('FETCH_CHALLENGE_PHOTOS', fetchChallengePhotosSaga);
};

export default photosSaga;