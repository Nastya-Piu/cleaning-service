import {
  SIGN_OUT_GOOGLE,
  SIGN_IN,
  WRONG_CREDENTIALS,
  SIGN_OUT,
  REGISTER,
  USER_EXISTS,
  FETCH_USER,
  UPDATE_USER,
  SIGN_IN_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userInfo: null,
  googleId: null,
  facebookId: null,
  wrongCredentials: false,
  userExists: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userInfo: action.payload.user, wrongCredentials: false, ...action.payload.params, userExists: false };
    case SIGN_OUT:
      localStorage.removeItem('accessToken');
      return { ...state, ...INITIAL_STATE };
    case SIGN_OUT_GOOGLE:
      return { ...INITIAL_STATE };
    case REGISTER:
      return { ...state, isSignedIn: true, userInfo: action.payload, wrongCredentials: false, userExists: false };
    case WRONG_CREDENTIALS:
    case SIGN_IN_ERROR:
      return { isSignedIn: false, wrongCredentials: true, userExists: false }
    case USER_EXISTS:
      return { ...state, isSignedIn: false, userExists: true, wrongCredentials: false }
    case FETCH_USER:
      return { ...state, userInfo: action.payload }
    case UPDATE_USER:
      return { ...state, userInfo: action.payload }
    default:
      return state;
  }
};