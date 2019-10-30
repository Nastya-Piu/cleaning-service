import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_OUT_GOOGLE,
  WRONG_CREDENTIALS,
  REGISTER,
  USER_EXISTS,
  FETCH_USER
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

  if(method === 'form') {
    queryString = `?email=${user.email}&password=${user.password}`;
  } else {
    queryString = `?${method}=${user[method]}`;
    params[method] = user[method];
  }

  queryString+= queryString ? '&limit=1' : queryString;

  return async dispatch => {

    const response = await api.get(`/users${queryString}`);
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

  return (dispatch) => {

      dispatch({
        type: SIGN_OUT
      })
    }
};

export const register = (method, credentials) => {

  return async dispatch => {

    let queryString = '';

    if(method === 'form') {
      queryString = `?email=${credentials.email}&password=${credentials.password}`;
    } else {
      queryString = `?${method}=${credentials[method]}`;
    }

    const userExists = await api.get(`/users${queryString}`);

    if(userExists.data.length){
      dispatch({
        type: USER_EXISTS
      });
    } else {
      if(!('profilePicURL' in credentials)) {
        credentials['profilePicURL'] = "https://picsum.photos/200";
      }
      const response = await api.post('/users', credentials);
      dispatch({
        type: REGISTER,
        payload: response.data
      });
      history.push('/');
    }
  };
};


export const getUser = (id) => {

  return async dispatch => {
    const userInfo = await api.get(`/users?id=${id}&limit=1`);

    dispatch({
      type: FETCH_USER,
      payload: userInfo.data[0]
    });

  };
};
