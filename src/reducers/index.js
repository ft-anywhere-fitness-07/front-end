import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import classReducer from './classReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    classes: classReducer
})

export default rootReducer
