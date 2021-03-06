import {
  SIGN_OUT_GOOGLE,
  SIGN_IN,
  WRONG_CREDENTIALS,
  SIGN_OUT,
  REGISTER
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userInfo: null,
  googleId: null,
  facebookId: null,
  wrongCredentials: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return {...state, isSignedIn: true, userInfo: action.payload.user, wrongCredentials: false, ...action.payload.params };
    case SIGN_OUT:
      return {...state, isSignedIn: false, facebookId: null, userInfo: null, googleId: null};
    case SIGN_OUT_GOOGLE:
      return {...state, isSignedIn: false, googleId: null, userInfo: null };
    case REGISTER:
        return {...state, isSignedIn: true, userInfo: action.payload, wrongCredentials: false };
    case WRONG_CREDENTIALS:
      return {...state, isSignedIn: false, wrongCredentials: true }
    default:
      return state;
  }
};