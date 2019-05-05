/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import { fetchAllAccount as fetchAllAccountsAction } from '../actions/AccountActions';

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    // minHeight: 400,
  },
  table: {
    minWidth: 700,
    // minHeight: 400,
  },
});

const UserList = ({ classes, accounts, fetchAllAccount }) => {
  useEffect(() => {
    if (!accounts) fetchAllAccount();
  });
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{I18n.get('thAccountId')}</TableCell>
            <TableCell>{I18n.get('thName')}</TableCell>
            <TableCell>{I18n.get('thBalance')}</TableCell>
            <TableCell align="right">{I18n.get('thActions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts && Object.keys(accounts).map(key => (
            <TableRow key={key} id={key}>
              <TableCell>{accounts[key].accountId}</TableCell>
              <TableCell>{accounts[key].name}</TableCell>
              <TableCell>${accounts[key].balance}</TableCell>
              <TableCell align="right">
                <Button size="small" color="primary">{I18n.get('deposit')}</Button><Button size="small" color="secondary">{I18n.get('withdraw')}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
UserList.propTypes = {
  accounts: PropTypes.object,
  fetchAllAccount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
UserList.defaultProps = { accounts: null };

const mapStateToProps = ({ accounts }) => ({ accounts });
const mapDispatchToProps = { fetchAllAccount: fetchAllAccountsAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserList));
