import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import I18n from '@kevinwang0316/i18n';

import {
  deposit as depositAction, withdraw as withdrawAction,
} from '../actions/AccountActions';

export const DepositWithdrawDialog = ({
  open, handleClose, isDeposit, accountId, deposit, withdraw,
}) => {
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => deposit(amount, accountId);

  const handleWithdraw = () => withdraw(amount, accountId);

  const handleConfirmClick = () => {
    if (isDeposit) handleDeposit();
    else handleWithdraw();
    setAmount(0);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{I18n.get(isDeposit ? 'depositDialogTitle' : 'withdrawDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${isDeposit ? I18n.get('depositDialogText') : I18n.get('withdrawDialogText')} ${accountId}`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label={I18n.get('thAmount')}
          type="number"
          fullWidth
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('cancel')}
        </Button>
        <Button onClick={handleConfirmClick} color="primary">
          {I18n.get(isDeposit ? 'deposit' : 'withdraw')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DepositWithdrawDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  deposit: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired,
  isDeposit: PropTypes.bool.isRequired,
  accountId: PropTypes.string.isRequired,
};
DepositWithdrawDialog.defaultProps = { open: false };

/* istanbul ignore next */
const mapDispatchToProps = {
  withdraw: withdrawAction,
  deposit: depositAction,
};
export default connect(null, mapDispatchToProps)(DepositWithdrawDialog);
