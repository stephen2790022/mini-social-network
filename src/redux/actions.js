/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { CHECKED } from 'redux/actionsVariables';
import { FETCH_NEWS_FAILURE } from 'redux/actionsVariables';
import { UN_CHECK } from 'redux/actionsVariables';

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

export { isChecked, fetchNewsFailure, unCheck };
