import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import I18n from '@kevinwang0316/i18n';

import { addAccount as addAccountAction } from '../actions/AccountActions';

export const AddAccountDialog = ({ open, handleClose, addAccount }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const handleAddAccount = () => {
    addAccount({ name, balance });
    setName('');
    setBalance(0);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{I18n.get('addAccountDialogTitle')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          margin="dense"
          id="balance"
          label="Balance"
          type="number"
          fullWidth
          value={balance}
          onChange={({ target }) => setBalance(target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {I18n.get('cancel')}
        </Button>
        <Button onClick={handleAddAccount} color="primary">
          {I18n.get('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
AddAccountDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
};
AddAccountDialog.defaultProps = { open: false };

/* istanbul ignore next */
const mapDispatchToProps = { addAccount: addAccountAction };
export default connect(null, mapDispatchToProps)(AddAccountDialog);
