import { FETCH_COMPANIES, FETCH_SERVICE_TYPES, FETCH_COMPANY, FETCH_ERROR, CREATE_REQUEST } from '../../store/actions/types';

export default (state = { data: {}, params: {}, types: [] }, action) => {

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
      return {...state, request: action.payload}
    default:
      return state;
  }
}