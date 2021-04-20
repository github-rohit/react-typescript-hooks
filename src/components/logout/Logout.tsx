import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Auth from '../../common/AuthService';
import Http from '../../common/http/User';
import { AppStore } from '../../store/Store';
import { set } from '../../store/User';

const connector = connect((state: AppStore) => {
  return {
    user: state.user,
  };
});

type Props = ConnectedProps<typeof connector>;

const Logout: React.SFC<Props> = (props) => {
  const { dispatch } = props;

  async function logout() {
    await Http.logout();
    (window as any).location = '/';
  }

  function handelOnClick() {
    Auth.logout();
    dispatch(set(null));
    logout();
  }

  return (
    <Button
      className="w-100"
      type="submit"
      variant="outlined"
      color="primary"
      onClick={handelOnClick}
    >
      Logout
    </Button>
  );
};

export default connector(Logout);
