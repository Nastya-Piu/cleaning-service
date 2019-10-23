import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import companyReducer from './companyReducer';
import authReducer from './authReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  companies: companyReducer
});