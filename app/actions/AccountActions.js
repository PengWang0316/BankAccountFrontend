import axios from 'axios';

import { FETCH_ALL_ACCOUNT_SUCCESS, ADD_ACCOUNT_SUCCESS } from './ActionTypes';
import { FETCH_ALL_ACCOUNT_API, ADD_ACCOUNT_API } from '../config';

const fetchAllAccountSuccess = accounts => ({
  type: FETCH_ALL_ACCOUNT_SUCCESS,
  accounts,
});

const addAccountSuccess = account => ({
  type: ADD_ACCOUNT_SUCCESS,
  account,
});

export const fetchAllAccount = () => dispatch => axios.get(FETCH_ALL_ACCOUNT_API)
  .then(({ data }) => dispatch(fetchAllAccountSuccess(data)));

export const addAccount = account => dispatch => axios.post(ADD_ACCOUNT_API, { account })
  .then(({ data }) => dispatch(addAccountSuccess(data)));
