import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { DepositWithdrawDialog } from '../../app/components/DepositWithdrawDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@kevinwang0316/i18n', () => ({ get: key => key }));

describe('DepositWithdrawDialog', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
    deposit: jest.fn(),
    withdraw: jest.fn(),
    isDeposit: true,
    accountId: 'accountId',
  };
  const getShallowComponent = (props = defaultProps) => shallow(<DepositWithdrawDialog {...props} />);

  beforeEach(() => jest.clearAllMocks());

  test('Initial state', () => {
    const component = getShallowComponent();

    const textFileds = component.find('TextField');
    expect(textFileds.prop('value')).toBe(0);
  });

  test('handleClose', () => {
    const component = getShallowComponent();
    component.find('Button').at(0).simulate('click');

    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('handleClickDeposit', () => {
    const component = getShallowComponent();
    const textFileds = component.find('TextField');
    textFileds.simulate('change', { target: { value: 100 } });
    component.find('Button').at(1).simulate('click');

    expect(defaultProps.deposit).toHaveBeenCalledTimes(1);
    expect(defaultProps.deposit).toHaveBeenLastCalledWith(100, 'accountId');
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('handleClickWithdraw', () => {
    const component = getShallowComponent({ ...defaultProps, isDeposit: false });
    const textFileds = component.find('TextField');
    textFileds.simulate('change', { target: { value: 100 } });
    component.find('Button').at(1).simulate('click');

    expect(defaultProps.withdraw).toHaveBeenCalledTimes(1);
    expect(defaultProps.withdraw).toHaveBeenLastCalledWith(100, 'accountId');
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('DepositWithdrawDialog with deposit snapshot', () => expect(renderer.create(<DepositWithdrawDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('DepositWithdrawDialog with withdraw snapshot', () => expect(renderer.create(<DepositWithdrawDialog {...{ ...defaultProps, isDeposit: false }} />).toJSON()).toMatchSnapshot());
});
