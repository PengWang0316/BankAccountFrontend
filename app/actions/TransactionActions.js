import axios from 'axios';

import { FETCH_ALL_TRANSACTION_API } from '../config';

export const fetchAllTransaction = async (id) => {
  const { data } = await axios.get(FETCH_ALL_TRANSACTION_API, { params: { id } });
  return data.sort((pre, next) => new Date(next.date) - new Date(pre.date));
};

export default fetchAllTransaction;
