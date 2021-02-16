/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import reducer from 'redux/reducer';

import { createStore } from 'redux';

export const store = createStore(reducer);
