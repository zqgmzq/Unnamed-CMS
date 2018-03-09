import { REQUEST_POST, RECEIVE_POST } from '../actions';
import union from 'lodash/union';

export default (state = {}, action) => {
  switch(action.type) {
    case REQUEST_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          isFetching: true
        }
      }
    case RECEIVE_POST:
      return {
        ...state,
        [action.response.postId]: {
          isFetching: false,
          ids: union(state[action.response.postId].ids, action.response.result),
          next_page_url: action.next_page_url
        }
      }
    default:
      return state;
  }
}