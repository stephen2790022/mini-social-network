/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/no-unresolved */
import {
  CHECKED, FETCH_NEWS_FAILURE, UN_CHECK, USERINFO, CURRENTUSERID,
} from 'redux/actionsVariables';
import Cookies from 'js-cookie';

const cookie = Cookies.get('userId');
const initialState = {
  checked: cookie ? true : false,
  error: '',
  info: null,
  currentUser: cookie,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKED:
      return {
        ...state,
        checked: true,
      };
    case UN_CHECK:
      return {
        ...state,
        checked: false,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case USERINFO:
      return {
        ...state,
        info: action.info,
      };
    case CURRENTUSERID:
      return {
        ...state,
        currentUser: action.currentUserID,
      };
    default:
      return state;
  }
};

export default reducer;
