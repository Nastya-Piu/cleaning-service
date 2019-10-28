import { FETCH_COMPANIES, FETCH_SERVICE_TYPES } from '../../store/actions/types';

export default (state = { data: {}, params: {}, types: [] }, action) => {

  switch (action.type) {
    case FETCH_COMPANIES:
      return { data: { ...action.payload.data }, params: action.payload.params };
    case FETCH_SERVICE_TYPES:
      return { ...state, types: [{ id: 3, name: "wefwefwfw"}, { id: 4, name: "wefwefwfw"}, { id: 6, name: "wefwefwfw"}]}
    default:
      return state;
  }
}