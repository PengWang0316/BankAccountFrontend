import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import I18n from '@kevinwang0316/i18n';

import LoadingAnimation from './SharedComponents/LoadingAnimation';

/* istanbul ignore next */
const styles = theme => ({
  paper: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    // minHeight: 400,
  },
  table: {
    minWidth: 800,
    // minHeight: 400,
  },
});

export const TransactionDialog = ({
  open, handleClose, transactions, classes, accountId,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
    maxWidth="md"
  >
    <DialogTitle id="form-dialog-title">{I18n.get('transicationDialogTitle')}</DialogTitle>
    <DialogContent>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">{I18n.get('thAccountId')}</TableCell>
              <TableCell padding="dense">{I18n.get('thType')}</TableCell>
              <TableCell padding="dense">{I18n.get('thAmount')}</TableCell>
              <TableCell align="justify" padding="dense">{I18n.get('thDate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!transactions && (
              <TableRow><LoadingAnimation /></TableRow>
            )}
            {transactions && transactions.map(({
              key, amount, type, date,
            }) => (
              <TableRow key={key}>
                <TableCell padding="dense">{accountId}</TableCell>
                <TableCell padding="dense">{type}</TableCell>
                <TableCell padding="dense">${amount}</TableCell>
                <TableCell padding="dense">{date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        {I18n.get('close')}
      </Button>
    </DialogActions>
  </Dialog>
);
TransactionDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  accountId: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
TransactionDialog.defaultProps = { open: false, transactions: null };

export default withStyles(styles)(TransactionDialog);
