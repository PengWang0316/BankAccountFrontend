import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { TransactionDialog } from '../../app/components/TransactionDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/Table', () => 'Table');
jest.mock('@material-ui/core/TableBody', () => 'TableBody');
jest.mock('@material-ui/core/TableCell', () => 'TableCell');
jest.mock('@material-ui/core/TableHead', () => 'TableHead');
jest.mock('@material-ui/core/TableRow', () => 'TableRow');
jest.mock('@material-ui/core/Paper', () => 'Paper');
jest.mock('@kevinwang0316/i18n', () => ({ get: key => key }));
jest.mock('../../app/components/SharedComponents/LoadingAnimation', () => 'LoadingAnimation');

describe('TransactionDialog', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
    accountId: 'accountId',
    transactions: [
      {
        key: '123', amount: 123, date: '2018/01/01', type: 'Deposit',
      },
      {
        key: '122', amount: 1232, date: '2018/04/01', type: 'Interest',
      },
    ],
    classes: {
      paper: 'paper',
      table: 'talbe',
    },
  };
  const getShallowComponent = (props = defaultProps) => shallow(<TransactionDialog {...props} />);

  beforeEach(() => jest.clearAllMocks());

  test('Click close button', () => {
    const component = getShallowComponent();

    component.find('Button').simulate('click');

    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('TransactionDialog with tansactions snapshot', () => expect(renderer.create(<TransactionDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('TransactionDialog without tansactions snapshot', () => expect(renderer.create(<TransactionDialog {...{ ...defaultProps, transactions: null }} />).toJSON()).toMatchSnapshot());
});
