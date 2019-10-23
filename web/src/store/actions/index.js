import api from '../../api';
import {
  SIGN_IN_GOOGLE,
  SIGN_OUT_GOOGLE,
  FETCH_COMPANIES,
  SIGN_IN_FACEBOOK,
  SIGN_OUT_FACEBOOK
} from './types';

export const signInGoogle = (userId, userInfo) => {
  return {
    type: SIGN_IN_GOOGLE,
    payload: {
      userId: userId,
      userInfo: userInfo
    }
  }
};

export const signOutGoogle = () => {
  return {
    type: SIGN_OUT_GOOGLE
  }
};

export const signInFacebook = (userId, userInfo) => {
  return {
    type: SIGN_IN_FACEBOOK,
    payload: {
      userId: userId,
      userInfo: userInfo
    }
  }
};

export const signOutFacebook = () => {
  return {
    type: SIGN_OUT_FACEBOOK
  }
};

export const fetchCompanies = (params = {}) => {

  return async dispatch => {
    let paramsString = '';
    if('query' in params){
      paramsString = params['query'] ? `?q=${params['query']}`: '';
    }
    if('sort' in params) {
      paramsString = params['sort'] ? (paramsString ? paramsString + '&' : '?') + `_sort=${params['sort']}` : '';
    }
    const response = await api.get('/services'+ paramsString);

    dispatch({
      type: FETCH_COMPANIES,
      payload: response.data
    })
  };
};