import { FETCH_ALL_ACCOUNT_SUCCESS } from '../actions/ActionTypes';

const Accounts = (state = null, { type, accounts }) => {
  switch (type) {
    case FETCH_ALL_ACCOUNT_SUCCESS:
      return accounts;
    default:
      return state;
  }
};
export default Accounts;
