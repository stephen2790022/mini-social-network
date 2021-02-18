/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import {
  FETCH_NEWS_FAILURE, CHECKED, UN_CHECK, USERINFO, CURRENTUSERID,
} from 'redux/actionsVariables';

const isChecked = () => ({
  type: CHECKED,
});
const unCheck = () => ({
  type: UN_CHECK,
});
const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  error,
});
const userInfo = (info) => ({
  type: USERINFO,
  info,
});
const getCurrentUserId = (currentUserID) => ({
  type: CURRENTUSERID,
  currentUserID,
});

export {
  isChecked, fetchNewsFailure, unCheck, userInfo, getCurrentUserId,
};
