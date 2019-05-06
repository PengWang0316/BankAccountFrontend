import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAuthenticator } from 'aws-amplify-react';

import { amplifyAuthSignOption } from '../../config';
import { currentAuthenticatedUser as currentAuthenticatedUserAction } from '../../actions/UserActions';
import UserList from '../UserList';

export const HomePageContainer = ({ user, currentAuthenticatedUser }) => {
  useEffect(() => {
    if (!user) currentAuthenticatedUser();
  });

  return (
    <UserList />
  );
};

HomePageContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  currentAuthenticatedUser: PropTypes.func.isRequired,
};
HomePageContainer.defaultProps = { user: null };

/* istanbul ignore next */
const mapStateToProps = state => ({ user: state.user });
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  currentAuthenticatedUser: user => dispatch(currentAuthenticatedUserAction(user)),
});
export default withAuthenticator(
  connect(mapStateToProps, mapDispatchToProps)(HomePageContainer),
  amplifyAuthSignOption,
);
