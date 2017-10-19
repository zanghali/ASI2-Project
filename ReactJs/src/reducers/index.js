import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import updateModelReducer from './updateModelReducer';
import commandReducer from './commandReducer';

const globalReducer = combineReducers({
    selectedReducer: selectedReducer,
    updateModelReducer: updateModelReducer,
    commandReducer : commandReducer
});

export default globalReducer;