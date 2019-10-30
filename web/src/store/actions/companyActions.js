import {
  FETCH_COMPANIES, FETCH_SERVICE_TYPES, FETCH_COMPANY, FETCH_ERROR, CREATE_REQUEST
} from './types';
import history from '../../history';
import api from '../../api';

export const fetchCompanies = (params = {}) => {

  return async dispatch => {
    let paramsString = '';

    const searchParams = {
      'query': 'q',
      'sort': '_sort',
      'order': '_order'
    };

    Object.keys(searchParams).forEach(key => {
      if(params[key]) {
        paramsString = `${(paramsString ? paramsString + '&' : '?')}${searchParams[key]}=${params[key]}`;
      }
    });

    await api.get(`/services${paramsString}`)
      .then((response) => {
        dispatch({
          type: FETCH_COMPANIES,
          payload: { data: response.data, params: params }
        })
      })
      .catch((err) => {
        dispatch({
          type: FETCH_ERROR,
          payload: err
        })
      });

  };
};

export const fetchServiceTypes = () => {

  return async dispatch => {

    const response = await api.get('/serviceTypes')

    dispatch({
      type: FETCH_SERVICE_TYPES,
      payload: response.data
    })
  };

};


export const fetchCompany = (id) => {
  return async dispatch => {

    const response = await api.get(`/services?id=${id}`)

    dispatch({
      type: FETCH_COMPANY,
      payload: response.data
    })
  };
};

export const createRequest = (request) => {
  return async dispatch => {

    const response = await api.post(`/userRequests`, request)

    dispatch({
      type: CREATE_REQUEST,
      payload: response.data
    })
    history.push('/order/success');
  };
}