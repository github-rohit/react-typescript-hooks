import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import FormInputs from '../../common/form/FormInputs';
import Http from '../../common/http/User';
import Auth from '../../common/AuthService';
import { AppStore } from '../../store/Store';
import { set } from '../../store/User';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';
import Fields from './Fields.json';
import schema from './Schema';

const connector = connect((state: AppStore) => {
  return {
    user: state.user,
  };
});

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

interface Data {
  email: string;
  passwd: string;
}

const Login: React.SFC<Props> = (props) => {
  const [snackbar, setSnackbar] = useState<CustomSnackbarProps | null>(null);
  const { register, errors, handleSubmit } = useForm<Data>({
    resolver: yupResolver(schema),
  });

  function updateUserInfo(token: string) {
    const { dispatch, history } = props;
    Auth.token = token;

    const { user } = Auth;

    dispatch(set(user));

    history.replace('/my/posts/published');
  }

  async function onSubmit(data: Data) {
    const { success, errors: resError, token } = await Http.login(data);
    if (resError) {
      setSnackbar({
        message: resError.msg,
        horizontal: 'center',
        autoHideDuration: null,
        severity: 'error',
      });
      return;
    }
    if (success) {
      updateUserInfo(token);
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
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default connector(Login);
