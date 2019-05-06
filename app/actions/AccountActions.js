import axios from 'axios';

import {
  FETCH_ALL_ACCOUNT_SUCCESS, ADD_ACCOUNT_SUCCESS, DEPOSIT_SUCCESS, WITHDRAW_SUCCESS,
} from './ActionTypes';
import {
  FETCH_ALL_ACCOUNT_API, ADD_ACCOUNT_API, DEPOSIT_API, WITHDRAW_API,
} from '../config';

const fetchAllAccountSuccess = accounts => ({
  type: FETCH_ALL_ACCOUNT_SUCCESS,
  accounts,
});

const addAccountSuccess = account => ({
  type: ADD_ACCOUNT_SUCCESS,
  account,
});

const depositSuccess = (amount, accountId) => ({
  type: DEPOSIT_SUCCESS,
  amount,
  accountId,
});

const withdrawSuccess = (amount, accountId) => ({
  type: WITHDRAW_SUCCESS,
  amount,
  accountId,
});

export const fetchAllAccount = () => dispatch => axios.get(FETCH_ALL_ACCOUNT_API)
  .then(({ data }) => dispatch(fetchAllAccountSuccess(data)));

export const addAccount = account => dispatch => axios.post(ADD_ACCOUNT_API, { ...account })
  .then(({ data }) => dispatch(addAccountSuccess(data)));

export const deposit = (amount, accountId) => (dispatch) => {
  dispatch(depositSuccess(amount, accountId));
  axios.put(DEPOSIT_API, { amount, accountId });
};

export const withdraw = (amount, accountId) => (dispatch) => {
  dispatch(withdrawSuccess(amount, accountId));
  axios.put(WITHDRAW_API, { amount, accountId });
};
