import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_ALL_ACCOUNT_SUCCESS, ADD_ACCOUNT_SUCCESS, DEPOSIT_SUCCESS, WITHDRAW_SUCCESS,
} from '../../app/actions/ActionTypes';
import {
  FETCH_ALL_ACCOUNT_API, ADD_ACCOUNT_API, DEPOSIT_API, WITHDRAW_API,
} from '../../app/config';

import * as AccountActions from '../../app/actions/AccountActions';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('uuid/v1', () => jest.fn().mockReturnValue('newId'));

describe('AccountActions', () => {
  test('fetchAllAccount', async () => {
    const accounts = { id1: {}, id2: { accountId: 'id2' } };
    axiosMock.onGet(FETCH_ALL_ACCOUNT_API).reply(200, accounts);
    const expectedActions = [{ type: FETCH_ALL_ACCOUNT_SUCCESS, accounts }];

    const store = mockStore();
    await store.dispatch(AccountActions.fetchAllAccount());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('addAccount', async () => {
    const accounts = { id1: {}, id2: { accountId: 'id2' } };
    const newAccount = { content: 'content' };
    const returnAccount = { accountId: 'newId', ...newAccount };

    axiosMock.onPost(ADD_ACCOUNT_API, { ...newAccount }).reply(200);
    const expectedActions = [{ type: ADD_ACCOUNT_SUCCESS, account: returnAccount }];

    const store = mockStore(accounts);
    await store.dispatch(AccountActions.addAccount(newAccount));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('deposit', async () => {
    const amount = 100.12;
    const accountId = 'accountId';
    const expectedActions = [
      { type: DEPOSIT_SUCCESS, amount, accountId },
    ];

    axiosMock.onPut(DEPOSIT_API, { amount, accountId }).reply(200);
    const store = mockStore();
    await store.dispatch(AccountActions.deposit(amount, accountId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('withdraw', async () => {
    const amount = 100.12;
    const accountId = 'accountId';
    const expectedActions = [
      { type: WITHDRAW_SUCCESS, amount, accountId },
    ];

    axiosMock.onPut(WITHDRAW_API, { amount, accountId }).reply(200);
    const store = mockStore();
    await store.dispatch(AccountActions.withdraw(amount, accountId));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
