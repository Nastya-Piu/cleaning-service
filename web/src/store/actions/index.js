import api from '../../api';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_OUT_GOOGLE,
  FETCH_COMPANIES,
  WRONG_CREDENTIALS,
  REGISTER
} from './types';
import history from '../../history';

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
      queryString = `?googleId=${user}`;
      params['googleId'] = user;
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
      })
    }else {
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
      let auth = window.gapi.auth2.getAuthInstance();
      auth.signOut(() => {
        dispatch({
          type: SIGN_OUT
        })
      });
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

    // TODO: first we need to check if user exists

    const response = await api.post('/users', credentials);

    dispatch({
      type: REGISTER,
      payload: response.data
    });
    history.push('/');
  };
};


export const fetchCompanies = (params = {}) => {
  console.log(params);
  return async dispatch => {
    let paramsString = '';

    if('query' in params){
      paramsString = params['query'] ? `?q=${params['query']}`: '';
    }
    if('sort' in params && params['sort']!== '') {
      paramsString = params['sort'] ? (paramsString ? paramsString + '&' : '?') + `_sort=${params['sort']}` : '';
    }
    if('order' in params && params['sort']!== '') {
      paramsString = params['order'] ? (paramsString ? paramsString + '&' : '?') + `_order=${params['order']}` : '';
    }
    const response = await api.get('/services'+ paramsString);

    dispatch({
      type: FETCH_COMPANIES,
      payload: { data: response.data, params: params }
    })
  };
};