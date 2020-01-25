import {
  FETCH_WHISKIES,
  FETCH_WHISKIES_SUCCESS,
  FETCH_WHISKIES_FAILURE
} from '../actions/index';

const initialState = {
  whiskies: [],
  isLoading: false,
  error: null
};

export default function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_WHISKIES:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_WHISKIES_SUCCESS:
      return {
        whiskies: [...action.payload],
        isLoading: false,
        error: null
      };
    case FETCH_WHISKIES_FAILURE:
      return {
        whiskies: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
