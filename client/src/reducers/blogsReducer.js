import mapKeys from 'lodash/mapKeys';
import { FETCH_BLOGS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOGS:
      return mapKeys(action.payload, '_id');
    default:
      return state;
  }
}
