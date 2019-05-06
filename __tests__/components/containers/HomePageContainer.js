import React from 'react';
import renderer from 'react-test-renderer';

import { HomePageContainer } from '../../../app/components/containers/HomePageContainer';

jest.mock('../../../app/components/UserList', () => 'UserList');

describe('HomePageContainer', () => {
  const defaultProps = {
    currentAuthenticatedUser: jest.fn(),
    user: { id: 'id' },
  };

  beforeEach(() => jest.clearAllMocks());

  test('Call with user', () => {
    renderer.create(<HomePageContainer {...defaultProps} />);
    expect(defaultProps.currentAuthenticatedUser).not.toHaveBeenCalled();
  });

  test('Call without user', () => {
    renderer.create(<HomePageContainer {...{ ...defaultProps, user: null }} />);
    expect(defaultProps.currentAuthenticatedUser).toHaveBeenCalledTimes(1);
  });

  test('HomePageContainer with a user snapshot', () => expect(renderer.create(<HomePageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('HomePageContainer without a user snapshot', () => expect(renderer.create(<HomePageContainer {...{ ...defaultProps, user: null }} />).toJSON()).toMatchSnapshot());
});
