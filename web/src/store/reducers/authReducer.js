import {
  SIGN_IN_GOOGLE,
  SIGN_OUT_GOOGLE,
  SIGN_IN_FACEBOOK,
  SIGN_OUT_FACEBOOK
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userInfo: null,
  googleId: null,
  facebookId: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN_GOOGLE:
      return {...state, isSignedIn: true, googleId: action.payload.userId, userInfo: action.payload.userInfo  };
    case SIGN_OUT_GOOGLE:
      return {...state, isSignedIn: false, googleId: null };
    case SIGN_IN_FACEBOOK:
      return {...state, isSignedIn: true, facebookId: action.payload.userId, userInfo: action.payload.userInfo };
    case SIGN_OUT_FACEBOOK:
      return {...state, isSignedIn: false, facebookId: null };
    default:
      return state;
  }
};