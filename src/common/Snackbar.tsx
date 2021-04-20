import React from 'react';
import Snackbar, {
  SnackbarOrigin,
  SnackbarProps,
} from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export type CustomSnackbarProps = {
  message: string;
  severity?: AlertProps['severity'];
  vertical?: SnackbarOrigin['vertical'];
  horizontal?: SnackbarOrigin['horizontal'];
  autoHideDuration?: SnackbarProps['autoHideDuration'];
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CustomizedSnackbars extends React.Component<CustomSnackbarProps> {
  state = { open: true };

  handleClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false,
    });
  }
  render() {
    const {
      vertical = 'top',
      horizontal = 'right',
      autoHideDuration = 6000,
    } = this.props;
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={autoHideDuration}
        onClose={this.handleClose.bind(this)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={this.handleClose.bind(this)}
          severity={this.props.severity}
        >
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}

export default CustomizedSnackbars;
