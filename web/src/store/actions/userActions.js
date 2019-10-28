import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_OUT_GOOGLE,
  WRONG_CREDENTIALS,
  REGISTER,
  USER_EXISTS
} from './types';
import history from '../../history';
import api from '../../api';

export const signOutGoogle = () => {
  return {
    type: SIGN_OUT_GOOGLE
  }
};

export const signIn = (method, user) => {

  let queryString = '';
  let params = {};

  switch(method) {
    case 'facebook':
      queryString = `?facebookId=${user.userID}`;
      params['facebookId'] = user.userID;
      break;
    case 'google':
      queryString = `?googleId=${user.googleId}`;
      params['googleId'] = user.googleId;
      break;
    case 'form': // TODO - add check of phone or email
      queryString = `?email=${user.email}&password=${user.password}`;
      break;
    default:
      queryString = '';
      break;
  }

  queryString+= queryString ? '&limit=1' : queryString;

  return async dispatch => {

    const response = await api.get('/users' + queryString);
    if(response.data.length === 0) {
      dispatch({
        type: WRONG_CREDENTIALS
      });
    } else {
      dispatch({
        type: SIGN_IN,
        payload: { user: response.data[0], params }
      });
      history.push('/');
    };
  }
};

export const signOut = () => {

  return (dispatch, getState) => {
    const authInfo = getState().auth;

    if(authInfo.googleId) {
      const auth = window.gapi.auth2.getAuthInstance();
      auth.isSignedIn.listen(result => {
        if(!result) {
          dispatch({
            type: SIGN_OUT
          });
        }
      });
      auth.signOut();
    } else if(authInfo.facebookId) {
      window.FB.logout(() => {
        dispatch({
          type: SIGN_OUT
        })
      });
    } else {
      dispatch({
        type: SIGN_OUT
      })
    }

  };
};

export const register = (method, credentials) => {

  return async dispatch => {

    let queryString = '';
    switch(method) {
      case 'form':
        queryString += `?email=${credentials.email}`;
        break;
      case 'google':
        queryString += `?googleId=${credentials.googleId}`;
        break;
      case 'facebook':
        queryString += `?facebookId=${credentials.userID}`;
        break;
      default:
        queryString = '';
        break;
    }

    const userExists = await api.get('/users' + queryString);

    if(userExists.data.length){
      dispatch({
        type: USER_EXISTS
      });
    } else {
      const response = await api.post('/users', credentials);
      dispatch({
        type: REGISTER,
        payload: response.data
      });
      history.push('/');
    }
  };
};
