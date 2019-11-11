import {
  FETCH_COMPANIES, FETCH_SERVICE_TYPES, FETCH_COMPANY, FETCH_ERROR, CREATE_REQUEST, ADD_REVIEW, FETCH_REVIEWS, FETCH_ORDERS, CREATE_COMPANY, APPEND_COMPANIES, EDIT_COMPANY, REMOVE_ORDER
} from './types';
import history from '../../history';
import api from '../../api';

export const fetchCompanies = (params = {}) => {

  return async dispatch => {
    let paramsString = '';

    const searchParams = {
      'query': 'q',
      'sort': '_sort',
      'order': '_order',
      'page': '_page',
      'limit': '_limit'
    };

    Object.keys(searchParams).forEach(key => {
      if (params[key]) {
        paramsString = `${(paramsString ? paramsString + '&' : '?')}${searchParams[key]}=${encodeURIComponent(params[key])}`;
      }
    });

    await api.get(`/services${paramsString}`)
      .then((response) => {

        if (params['page'] && params['page'] > 1) {
          if (response.data.length) {
            dispatch({
              type: APPEND_COMPANIES,
              payload: { data: response.data, params: params }
            })
          }
        } else {
          dispatch({
            type: FETCH_COMPANIES,
            payload: { data: response.data, params: params }
          })
        }

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

export const createCompany = company => {
  return async dispatch => {

    const response = await api.post(`/services`, company)

    dispatch({
      type: CREATE_COMPANY,
      payload: response.data
    })
    history.push(`/services/${response.data.id}`);
  };
}

export const editCompany = company => {
  return async dispatch => {

    const response = await api.patch(`/services/${company.id}`, company)

    dispatch({
      type: EDIT_COMPANY,
      payload: response.data
    })
    history.push(`/services/${response.data.id}`);
  };
}

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


export const fetchReviews = serviceId => {

  return async dispatch => {

    const response = await api.get(`/reviews?serviceId=${serviceId}&_sort=created&_order=desc`)

    dispatch({
      type: FETCH_REVIEWS,
      payload: response.data
    })
  };

}

export const fetchOrders = userId => {

  return async dispatch => {

    const response = await api.get(`/userRequests?userId=${userId}&_sort=created&_order=desc`)

    dispatch({
      type: FETCH_ORDERS,
      payload: response.data
    })
  };

}

export const removeOrder = orderId => {

  return async dispatch => {

    await api.delete(`/userRequests/${orderId}`)

    dispatch({
      type: REMOVE_ORDER,
      payload: orderId
    })
  };
};

export const addReview = (review) => {
  return async dispatch => {
    const response = await api.post(`/reviews`, review)

    dispatch({
      type: ADD_REVIEW,
      payload: response.data
    })

  }

}