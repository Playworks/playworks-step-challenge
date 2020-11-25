import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sends a post request with faq creation data and refetches FAQ with 'FETCH_FAQ'
function* createFAQSaga(action) {
  yield axios({
    method: 'POST',
    url: '/api/faq',
    data: action.payload
  });
  yield put({
    type: 'FETCH_FAQ',
  });
};

// Function fetches faq and puts them in reducer listening for SET_FAQ
function* fetchFAQSaga(){
  let response = yield axios.get(`/api/faq`);
  yield put({
    type: 'SET_FAQ',
    payload: response.data
  });
};

function* faqSaga() {
    yield takeLatest('CREATE_FAQ', createFAQSaga);
    yield takeLatest('FETCH_FAQ', fetchFAQSaga);
};

export default faqSaga;