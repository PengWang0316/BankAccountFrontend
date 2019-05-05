import axios from 'axios';

import { FETCH_ALL_ACCOUNT_SUCCESS } from './ActionTypes';
import { FETCH_ALL_ACCOUNT_API } from '../config';

const fetchAllAccountSuccess = accounts => ({
  type: FETCH_ALL_ACCOUNT_SUCCESS,
  accounts,
});

export const fetchAllAcount = () => dispatch => axios.get(FETCH_ALL_ACCOUNT_API)
  .then(({ data }) => dispatch(fetchAllAccountSuccess(data)));

export default fetchAllAcount;
