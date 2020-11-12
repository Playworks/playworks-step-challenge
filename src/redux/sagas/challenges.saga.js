
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchChallengesSaga(){
  let response = yield axios.get(`/api/challenges`);
  console.log(response.data);

  yield put({
    type: 'SET_CHALLENGES',
    payload: response.data
  });
};

function* createChallengesSage(action) {
  let response = yield axios({
      method: 'POST',
      url: '/api/challenges',
      data: action.payload
  });
  console.log('Response', response);
  yield put({
      type: 'FETCH_CHALLENGES',
      payload: response.data
  })
}

function* fetchDailyChallengeSaga(action){
  console.log('ACTION PAYLOAD', action.payload);
  
  let response = yield axios({
      method: 'POST',
      url: `/api/dailychallenge`,
      data: action.payload
  });
  console.log('HERE IS THE RESPONSE', response.data);

  yield put({
      type: 'SET_DAILY_CHALLENGE',
      payload: response.data
  });
};

function* challengesSaga() {
  yield takeLatest('FETCH_CHALLENGES', fetchChallengesSaga);
  yield takeLatest('CREATE_CHALLENGES', createChallengesSage);
  yield takeLatest('FETCH_DAILY_CHALLENGE', fetchDailyChallengeSaga);
};

export default challengesSaga;