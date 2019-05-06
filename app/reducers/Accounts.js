import {
  FETCH_ALL_ACCOUNT_SUCCESS, ADD_ACCOUNT_SUCCESS,
  DEPOSIT_SUCCESS, WITHDRAW_SUCCESS,
} from '../actions/ActionTypes';

const Accounts = (
  state = null,
  {
    type, accounts, account, accountId, amount,
  },
) => {
  switch (type) {
    case FETCH_ALL_ACCOUNT_SUCCESS:
      return accounts;
    case ADD_ACCOUNT_SUCCESS:
      return { ...state, [account.accountId]: account };
    case DEPOSIT_SUCCESS: {
      const newState = { ...state };
      newState[accountId].amount += amount;
      return newState;
    }
    case WITHDRAW_SUCCESS: {
      const newState = { ...state };
      newState[accountId].amount -= amount;
      return newState;
    }
    default:
      return state;
  }
};
export default Accounts;
