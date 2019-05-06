/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, Fragment } from 'react';
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
import { fetchAllTransaction } from '../actions/TransactionActions';
import TransactionDialog from './TransactionDialog';
import DepositWithdrawDialog from './DepositWithdrawDialog';

/* istanbul ignore next */
const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const UserList = ({ classes, accounts, fetchAllAccount }) => {
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [openDepositWithdrawDialog, setOpenDepositWithdrawDialog] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);
  const [transactions, setTransactions] = useState(null);
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    if (!accounts) fetchAllAccount();
  });

  const handleTransactionDialogClose = () => setOpenTransactionDialog(false);

  const handleRowClick = async ({ target: { parentNode: { id } } }) => {
    setTransactions(null);
    setAccountId(id);
    setOpenTransactionDialog(true);
    const result = await fetchAllTransaction(id);
    setTransactions(result);
  };

  const handleDepositClick = (event) => {
    event.stopPropagation();
    setAccountId(event.target.tagName === 'BUTTON' ? event.target.parentNode.parentNode.id : event.target.parentNode.parentNode.parentNode.id);
    setIsDeposit(true);
    setOpenDepositWithdrawDialog(true);
  };

  const handleWithdrawClick = (event) => {
    event.stopPropagation();
    setAccountId(event.target.tagName === 'BUTTON' ? event.target.parentNode.parentNode.id : event.target.parentNode.parentNode.parentNode.id);
    setIsDeposit(false);
    setOpenDepositWithdrawDialog(true);
  };

  const handleDWDialogClose = () => setOpenDepositWithdrawDialog(false);

  return (
    <Fragment>
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
              <TableRow key={key} id={key} onClick={handleRowClick} className={classes.row}>
                <TableCell>{accounts[key].accountId}</TableCell>
                <TableCell>{accounts[key].name}</TableCell>
                <TableCell>${accounts[key].balance}</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary" onClick={handleDepositClick}>{I18n.get('deposit')}</Button>
                  <Button size="small" color="secondary" onClick={handleWithdrawClick}>{I18n.get('withdraw')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <TransactionDialog
        open={openTransactionDialog}
        handleClose={handleTransactionDialogClose}
        transactions={transactions}
        accountId={accountId}
      />
      <DepositWithdrawDialog
        open={openDepositWithdrawDialog}
        handleClose={handleDWDialogClose}
        accountId={accountId}
        isDeposit={isDeposit}
      />
    </Fragment>
  );
};
UserList.propTypes = {
  accounts: PropTypes.shape({
    accountId: PropTypes.string,
    name: PropTypes.string,
    balance: PropTypes.number,
  }),
  fetchAllAccount: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
UserList.defaultProps = { accounts: null };

/* istanbul ignore next */
const mapStateToProps = ({ accounts }) => ({ accounts });
/* istanbul ignore next */
const mapDispatchToProps = { fetchAllAccount: fetchAllAccountsAction };
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserList));
