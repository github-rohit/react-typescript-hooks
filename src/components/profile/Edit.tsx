import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import EditForm from './EditForm';
import Http from '../../common/http/User';
import Auth from '../../common/AuthService';
import { AppStore } from '../../store/Store';
import { set } from '../../store/User';
import { User } from '../../types/User';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';

const connector = connect((state: AppStore) => {
  return {
    user: state.user.details,
  };
});

type Props = ConnectedProps<typeof connector>;

type Data = User;

const Edit: React.FC<Props> = (props) => {
  const { dispatch } = props;
  const [user, setUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState<CustomSnackbarProps | null>(null);

  async function onSubmit(data: Data) {
    const { _id } = Auth.user as User;
    setSnackbar(null);
    const response = await Http.patch(_id, data);
    const { success } = response;

    if (success) {
      setSnackbar({
        message: 'Profile updated successfully.',
        severity: 'success',
      });
    } else {
      setSnackbar({
        message: 'Something went wrong, Please try again later.',
        severity: 'error',
      });
    }
  }

  useEffect(() => {
    const { _id } = Auth.user as User;
    (async () => {
      const response = await Http.getById(_id);

      if (!response) {
        return;
      }

      setUser(response);
      dispatch(set(response));
    })();
  }, [dispatch]);

  return (
    <>
      {snackbar && <Snackbar {...snackbar} />}
      {user && <EditForm defaultValues={user} onSubmit={onSubmit} />}
    </>
  );
};

export default connector(Edit);
