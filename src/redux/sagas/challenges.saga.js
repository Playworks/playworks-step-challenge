import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchChallenges(action) {
    console.log('fetchChallenges Action:', action);
    let response = yield axios({
      method: 'GET',
      url: '/api/challenges'
    });  
    console.log('List of Challenges:', response.data);
    yield put({
      type: 'SET_CHALLENGES',
      payload: response.data
    });
  }


function* challengesSaga() {
  yield takeLatest('FETCH_CHALLENGES', fetchChallenges);

}

export default challengesSaga;