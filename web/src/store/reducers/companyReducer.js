import { FETCH_COMPANIES } from '../../store/actions/types';

export default (state = { data: {}, params: {} }, action) => {

  switch (action.type) {
    case FETCH_COMPANIES:
      return { data: { ...action.payload.data }, params: action.payload.params };
    default:
      return state;
  }
}