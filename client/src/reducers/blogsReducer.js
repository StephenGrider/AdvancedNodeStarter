import { FETCH_BLOGS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOGS:
      return action.payload;
    default:
      return state;
  }
}
