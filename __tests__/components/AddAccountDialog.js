import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { AddAccountDialog } from '../../app/components/AddAccountDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@kevinwang0316/i18n', () => ({ get: key => key }));

describe('AddAccountDialog', () => {
  const defaultProps = {
    open: false,
    handleClose: jest.fn(),
    addAccount: jest.fn(),
  };
  const getShallowComponent = (props = defaultProps) => shallow(<AddAccountDialog {...props} />);

  beforeEach(() => jest.clearAllMocks());

  test('Initial state', () => {
    const component = getShallowComponent();

    const textFileds = component.find('TextField');
    expect(textFileds.at(0).prop('value')).toBe('');
    expect(textFileds.at(1).prop('value')).toBe(0);
  });

  test('handleClose', () => {
    const component = getShallowComponent();
    component.find('Button').at(0).simulate('click');

    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('handleAddAccount', () => {
    const component = getShallowComponent();
    const textFileds = component.find('TextField');
    textFileds.at(0).simulate('change', { target: { value: 'newName' } });
    textFileds.at(1).simulate('change', { target: { value: 100 } });
    component.find('Button').at(1).simulate('click');

    expect(defaultProps.addAccount).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  test('AddAccountDialog snapshot', () => expect(renderer.create(<AddAccountDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
});
