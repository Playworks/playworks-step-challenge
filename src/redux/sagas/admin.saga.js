import { all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Function sends delete request with photo_id then yield all with contest_id
function* adminDeletePhotoSaga(action){
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

// Function sends get request with contest id and puts that data into reducer listening for ADMIN_CONTEST
function* fetchContestDetailsSaga(action) {
  let contest_id = action.payload;
  let response = yield axios({
    method: 'GET',
    url: `/api/contestDetails/${contest_id}`,
  });
  yield put({
    type: 'ADMIN_CONTEST',
    payload: response.data
  });
};

// Function gets all photos for admin and puts them into reducer listening for ADMIN_PHOTOS
function* fetchContestPhotosSaga(action) {
  let contest_id = action.payload;
  let response = yield axios({
    method: 'GET',
    url: `/api/adminphotos/${contest_id}`,
  });
  yield put({
      type: 'ADMIN_PHOTOS',
      payload: response.data
  });
};

function* adminSaga() {
  yield takeLatest('ADMIN_DELETE_PHOTO', adminDeletePhotoSaga);
  yield takeLatest('FETCH_CONTEST_DETAILS', fetchContestDetailsSaga);
  yield takeLatest('FETCH_CONTEST_PHOTOS', fetchContestPhotosSaga);
};
  
export default adminSaga;