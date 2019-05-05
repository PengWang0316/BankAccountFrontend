import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_ALL_ACCOUNT_SUCCESS } from '../../app/actions/ActionTypes';
import { FETCH_ALL_ACCOUNT_API } from '../../app/config';

import * as AccountActions from '../../app/actions/AccountActions';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AccountActions', () => {
  test('fetchAllAccount', async () => {
    const accounts = { id1: {}, id2: { accountId: 'id2' } };
    axiosMock.onGet(FETCH_ALL_ACCOUNT_API).reply(200, accounts);
    const expectedActions = [{ type: FETCH_ALL_ACCOUNT_SUCCESS, accounts }];

    const store = mockStore();
    await store.dispatch(AccountActions.fetchAllAccount());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
