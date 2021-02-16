/* eslint-disable import/no-unresolved */
import { CHECKED, FETCH_NEWS_FAILURE, UN_CHECK } from 'redux/actionsVariables';

const initialState = {
  checked: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKED:
      return {
        ...state,
        checked: true,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case UN_CHECK:
      return {
        ...state,
        checked: false,
      };
    default:
      return state;
  }
};

export default reducer;
