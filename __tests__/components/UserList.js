import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { UserList } from '../../app/components/UserList';
import { fetchAllTransaction } from '../../app/actions/TransactionActions';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Table', () => 'Table');
jest.mock('@material-ui/core/TableBody', () => 'TableBody');
jest.mock('@material-ui/core/TableCell', () => 'TableCell');
jest.mock('@material-ui/core/TableHead', () => 'TableHead');
jest.mock('@material-ui/core/TableRow', () => 'TableRow');
jest.mock('@material-ui/core/Paper', () => 'Paper');
jest.mock('../../app/components/TransactionDialog', () => 'TransactionDialog');
jest.mock('../../app/components/DepositWithdrawDialog', () => 'DepositWithdrawDialog');
jest.mock('@kevinwang0316/i18n', () => ({ get: key => key }));
jest.mock('../../app/actions/TransactionActions', () => ({ fetchAllTransaction: jest.fn() }));

describe('UserList', () => {
  const defaultProps = {
    classes: { root: 'root', table: 'table', row: 'row' },
    accounts: { id1: { accountid: 'id1', name: 'name1', balance: 100 }, id2: { accountid: 'id2', name: 'name2', balance: 130 } },
    fetchAllAccount: jest.fn(),
  };
  const getShallowComponent = (props = defaultProps) => shallow(<UserList {...props} />);

  beforeEach(() => jest.clearAllMocks());

  test('Initial with accounts', () => {
    renderer.create(<UserList {...defaultProps} />);
    expect(defaultProps.fetchAllAccount).not.toHaveBeenCalled();
  });

  test('Initial without accounts', () => {
    renderer.create(<UserList {...{ ...defaultProps, accounts: null }} />);
    expect(defaultProps.fetchAllAccount).toHaveBeenCalledTimes(1);
  });

  test('handleRowClick', () => {
    const component = getShallowComponent();
    const tableRows = component.find('TableRow');
    tableRows.at(1).simulate('click', { target: { parentNode: { id: 'id' } } });

    expect(fetchAllTransaction).toHaveBeenCalledTimes(1);
  });

  test('handleDepositClick', () => {
    const mockStopPropagationFn = jest.fn();
    const component = getShallowComponent();
    const buttons = component.find('Button');
    buttons.at(0).simulate('click', { stopPropagation: mockStopPropagationFn, target: { tagName: 'BUTTON', parentNode: { parentNode: { id: 'id1' } } } });

    expect(mockStopPropagationFn).toHaveBeenCalledTimes(1);

    buttons.at(0).simulate('click', { stopPropagation: mockStopPropagationFn, target: { tagName: 'SPAN', parentNode: { parentNode: { parentNode: { id: 'id1' } } } } });
    expect(mockStopPropagationFn).toHaveBeenCalledTimes(2);
  });

  test('handleWithdrawClick', () => {
    const mockStopPropagationFn = jest.fn();
    const component = getShallowComponent();
    const buttons = component.find('Button');
    buttons.at(1).simulate('click', { stopPropagation: mockStopPropagationFn, target: { tagName: 'BUTTON', parentNode: { parentNode: { id: 'id1' } } } });

    expect(mockStopPropagationFn).toHaveBeenCalledTimes(1);

    buttons.at(1).simulate('click', { stopPropagation: mockStopPropagationFn, target: { tagName: 'SPAN', parentNode: { parentNode: { parentNode: { id: 'id1' } } } } });
    expect(mockStopPropagationFn).toHaveBeenCalledTimes(2);
  });

  test('UserList with accounts snapshot', () => expect(renderer.create(<UserList {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('UserList without accounts snapshot', () => expect(renderer.create(<UserList {...{ ...defaultProps, accounts: null }} />).toJSON()).toMatchSnapshot());
});
