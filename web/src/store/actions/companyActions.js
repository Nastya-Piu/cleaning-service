import {
  FETCH_COMPANIES, FETCH_SERVICE_TYPES
} from './types';
import api from '../../api';

export const fetchCompanies = (params = {}) => {

  return async dispatch => {
    let paramsString = '';

    if('query' in params){
      paramsString = params['query'] ? `?q=${params['query']}`: '';
    }
    if('sort' in params && params['sort']!== '') { // TODO: change it to one function, DRY
      paramsString = params['sort'] ? (paramsString ? paramsString + '&' : '?') + `_sort=${params['sort']}` : '';
    }
    if('order' in params && params['order']!== '') {
      paramsString = params['order'] ? (paramsString ? paramsString + '&' : '?') + `_order=${params['order']}` : '';
    }
    const response = await api.get('/services'+ paramsString);

    dispatch({
      type: FETCH_COMPANIES,
      payload: { data: response.data, params: params }
    })
  };
};

export const fetchServiceTypes = () => {

  return async dispatch => {

    const response = await api.get('/serviceTypes');

    console.log(response);

    dispatch({
      type: FETCH_SERVICE_TYPES,
      payload: response.data
    })
  };

};