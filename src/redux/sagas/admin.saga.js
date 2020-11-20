import { all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga listens for ADMIN_DELETE_PHOTO action.payload is an object with two properties
// photo_id for which we send via delete request and a contest_id to refetch contest details and photos
function* adminDeletePhotoSaga(action){
  console.log('in admin Delete Photo Saga this is our action.payload', action.payload);
  let contest_id = action.payload.contest_id;
  let photo_id = action.payload.photo_id;
  yield axios({
    method: 'DELETE',
    url: `/api/adminphotos/${photo_id}`
  });

  yield all([
    put({ type: 'FETCH_CONTEST_DETAILS', payload: contest_id}),
    put({ type: 'FETCH_CONTEST_PHOTOS', payload: contest_id}),
  ]);
};

function* fetchContestDetailsSaga(action) {
  console.log('fetchContestDetailsSaga action payload', action.payload);
  let contest_id = action.payload;
  let response = yield axios({
    method: 'GET',
    url: `/api/contestDetails/${contest_id}`,
  })
  console.log('response from contest details', response.data);
  yield put({
    type: 'ADMIN_CONTEST',
    payload: response.data
  })
  }

function* fetchContestPhotosSaga(action) {
  console.log('fetchContestPhotosSaga', action.payload);
  let contest_id = action.payload;
  let response = yield axios({
    method: 'GET',
    url: `/api/adminphotos/${contest_id}`,
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
    yield takeLatest('ADMIN_DELETE_PHOTO', adminDeletePhotoSaga);
  };
  
  export default adminSaga;