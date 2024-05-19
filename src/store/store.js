import { createStore } from 'redux';
import rootReducer from '../reducers/reducers';

// 스토어 생성
const store = createStore(rootReducer);

export default store;
