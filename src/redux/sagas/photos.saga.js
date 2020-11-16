import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPhotosSaga(){
    let response = yield axios.get(`/api/photos`);
    console.log(response.data);
    yield put({
        type: 'SET_PHOTOS',
        payload: response.data
    });
  };

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


function* createPhotosSaga(action) {
    console.log('ACTION PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/photos',
        data: action.payload
    });
    console.log('Response', response);
    yield put({
        type: ('FETCH_PHOTOS', 'FETCH_LEADER_BOARD', 'FETCH_CHALLENGE_PHOTOS', 'FETCH_TOP_STEPPERS'),
        payload: response.data
    });
  };

function* photosSaga() {
    yield takeLatest('CREATE_PHOTOS', createPhotosSaga);
    yield takeLatest('FETCH_PHOTOS', fetchPhotosSaga);
    yield takeLatest('FETCH__ADMIN_PHOTOS', fetchPhotosSaga);
    yield takeLatest('FETCH_CHALLENGE_PHOTOS', fetchChallengePhotosSaga);
};

export default photosSaga;