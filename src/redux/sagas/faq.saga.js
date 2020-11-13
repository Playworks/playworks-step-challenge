import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createFAQSaga(action) {
    console.log('FAQ PAYLOAD', action.payload);    
    let response = yield axios({
        method: 'POST',
        url: '/api/faq',
        data: action.payload
    });
    console.log('Response', response);
    yield put({
        type: 'FETCH_FAQ',
    });
  };

function* fetchFAQSaga(){
    let response = yield axios.get(`/api/faq`);
    console.log(response.data);
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