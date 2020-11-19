import { put, takeLatest, all } from 'redux-saga/effects';
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
    // yield all([
    //     put({ type: 'FETCH_PHOTOS' }),
    //     put({ type: 'FETCH_LEADER_BOARD' }),
    //     put({ type: 'FETCH_CHALLENGE_PHOTOS' }),
    //     put({ type: 'FETCH_TOP_STEPPERS' }),
    // ]);
  };

function* denyPhotosSaga(action){    
    let response = yield axios({
        method: 'DELETE',
        url: `/api/photos/${action.payload.id}`,
        data: action.payload
    });
    console.log('DELETEPHOTOS', response.data);      
    yield put({
        type: 'FETCH_TEAM_PHOTOS',
        payload: response.data
    });
  };

function* approvePhotosSaga(action){    
    let response = yield axios({
        method: 'PUT',
        url: `/api/photos/${action.payload}`,
    });
    console.log('APPROVEPHOTOS', response.data);      
    yield put({
        type: 'FETCH_TEAM_PHOTOS',
        payload: response.data
    });
  };


function* photosSaga() {
    yield takeLatest('CREATE_PHOTOS', createPhotosSaga);
    yield takeLatest('FETCH_PHOTOS', fetchPhotosSaga);
    yield takeLatest('FETCH__ADMIN_PHOTOS', fetchPhotosSaga);
    yield takeLatest('FETCH_CHALLENGE_PHOTOS', fetchChallengePhotosSaga);
    yield takeLatest('DELETE_PHOTOS', denyPhotosSaga);
    yield takeLatest('APPROVE_PHOTOS', approvePhotosSaga);
};

export default photosSaga;