import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchContestDetailsSaga(action) {
    console.log('action payload', action.payload);
    let contest = action.payload;
    let response = yield axios({
      method: 'GET',
      url: `/api/contestDetails/${contest}`,
      data: {
        id: contest
      }
    })
    console.log('response from contest details', response.data);
    yield put({
      type: 'ADMIN_CONTEST',
      payload: response.data
    })
  }

function* fetchContestPhotosSaga(action) {
    let contest = action.payload;
    let response = yield axios({
        method: 'GET',
        url: `/api/adminphotos/${contest}`,
        data: {
            id: contest
        }
    })
    console.log('res', response.data);
    yield put({
        type: 'ADMIN_PHOTOS',
        payload: response.data
    })
}

  function* adminSaga() {
    yield takeLatest('FETCH_CONTEST_DETAILS', fetchContestDetailsSaga);
    yield takeLatest('FETCH_CONTEST_PHOTOS', fetchContestPhotosSaga);
  };
  
  export default adminSaga;