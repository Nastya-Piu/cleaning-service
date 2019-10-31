import { FETCH_COMPANIES, FETCH_SERVICE_TYPES, FETCH_COMPANY, FETCH_ERROR, CREATE_REQUEST, ADD_REVIEW, FETCH_REVIEWS } from '../../store/actions/types';

export default (state = { data: {}, params: {}, types: [], reviews: [] }, action) => {

  switch (action.type) {
    case FETCH_COMPANIES:
      return { data: { ...action.payload.data }, params: action.payload.params };
    case FETCH_COMPANY:
      return { ...state, data: { ...action.payload }, params: {} };
    case FETCH_SERVICE_TYPES:
      return { ...state, types: action.payload }
    case FETCH_ERROR:
      return { ...state, error: action.payload }
    case CREATE_REQUEST:
      return { ...state, request: action.payload }
    case FETCH_REVIEWS:
      return { ...state, reviews: action.payload }
    default:
      return state;
  }
}