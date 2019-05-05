import { FETCH_ALL_ACCOUNT_SUCCESS, ADD_ACCOUNT_SUCCESS } from '../actions/ActionTypes';

const Accounts = (state = null, { type, accounts, account }) => {
  switch (type) {
    case FETCH_ALL_ACCOUNT_SUCCESS:
      return accounts;
    case ADD_ACCOUNT_SUCCESS:
      console.warn(account);
      return { ...state, ...account };
    default:
      return state;
  }
};
export default Accounts;
