import axios from 'axios';

import { fetchAllTransaction } from '../../app/actions/TransactionActions';
import { FETCH_ALL_TRANSACTION_API } from '../../app/config';

jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue({
    data: [
      {
        key: '1234', type: 'Deposit', amount: 200, date: new Date('2011/02/02'),
      },
      {
        key: '1233', type: 'Interest', amount: 2.13, date: new Date('2018/02/04'),
      },
      {
        key: '1434', type: 'Withdraw', amount: 100, date: new Date('2013/12/02'),
      },
    ],
  }),
}));

describe('TransactionActions', () => {
  test('fetchAllTransaction', async () => {
    const result = await fetchAllTransaction('id1');

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenLastCalledWith(FETCH_ALL_TRANSACTION_API, { params: { id: 'id1' } });
    expect(result).toEqual([
      {
        key: '1233', type: 'Interest', amount: 2.13, date: new Date('2018/02/04'),
      },
      {
        key: '1434', type: 'Withdraw', amount: 100, date: new Date('2013/12/02'),
      },
      {
        key: '1234', type: 'Deposit', amount: 200, date: new Date('2011/02/02'),
      },
    ]);
  });
});
