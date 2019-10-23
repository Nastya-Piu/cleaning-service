import { FETCH_COMPANIES } from '../../store/actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMPANIES:
      return { ...action.payload };
    default:
      return state;
  }
}