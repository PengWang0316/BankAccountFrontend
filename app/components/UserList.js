/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
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

const UserList = ({ classes, rows }) => {
  rows = [{ accountId: '123', name: 'test name', balance: 1223 }];
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
          {rows && rows.map(row => (
            <TableRow key={row.accountId} id={row.accountId}>
              <TableCell>{row.accountId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>${row.balance}</TableCell>
              <TableCell align="right">
                <Button size="small" color="primary">Deposit</Button><Button size="small" color="secondary">Withdraw</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.object,
};
UserList.defaultProps = { rows: null };
export default withStyles(styles)(UserList);
