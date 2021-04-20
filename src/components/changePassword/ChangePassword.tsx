import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import FormInputs from '../../common/form/FormInputs';

import Auth from '../../common/AuthService';
import Http from '../../common/http/User';
import Fields from './Fields.json';
import schema from './Schema';
import { AppStore } from '../../store/Store';
import { User } from '../../types/User';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';

const connector = connect((state: AppStore) => {
  return {
    user: state.user.details,
  };
});

type Props = ConnectedProps<typeof connector>;

interface Data {
  oldPasswd: string;
  passwd: string;
  confirmPasswd: string;
}

const ChangePassword: React.FC<Props> = () => {
  const [snackbar, setSnackbar] = useState<CustomSnackbarProps | null>(null);
  const { register, errors, handleSubmit } = useForm<Data>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData: Data) {
    setSnackbar(null);
    const { _id: id } = Auth.user as User;
    const response = await Http.password({
      id,
      ...formData,
    });

    if (!response) {
      setSnackbar({
        horizontal: 'center',
        autoHideDuration: null,
        severity: 'error',
        message: 'Something went wrong!',
      });
      return;
    }

    const { success, errors: resErrors } = response;
    if (success) {
      setSnackbar({
        severity: 'success',
        message: 'Profile updated successfully.',
      });
    } else if (resErrors) {
      setSnackbar({
        horizontal: 'center',
        autoHideDuration: null,
        severity: 'error',
        message: resErrors.msg || resErrors || 'Something went wrong!',
      });
    }
  }

  useEffect(() => {
    document.body.classList.toggle('darkClass');

    return () => {
      document.body.classList.remove('darkClass');
    };
  }, []);

  return (
    <>
      {snackbar && <Snackbar {...snackbar} />}
      <div className="form-card">
        <div className="form-card__body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputs register={register} fields={Fields} errors={errors} />
            <Button
              className="w-100"
              type="submit"
              variant="contained"
              color="primary"
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default connector(ChangePassword);
