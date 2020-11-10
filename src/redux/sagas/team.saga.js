import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function createTeamSaga(action){
  console.log('in Create Team Saga, this is action.payload', action.payload);
};

function* teamSaga() {
  yield takeLatest('CREATE_TEAM', createTeamSaga);
};

export default teamSaga;