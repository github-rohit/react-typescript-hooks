import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import FormInputs from '../../common/form/FormInputs';
import Http from '../../common/http/User';
import Fields from './Fields.json';
import schema from './Schema';

interface Data {
  email: string;
  name: string;
  passwd: string;
  confirmPasswd: string;
}

const Signup: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { register, errors, setError, handleSubmit } = useForm<Data>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData: Data) {
    try {
      const { data, status, success: resSuccess } = await Http.post(formData);
      const { errors: resError } = data || {};

      if (resSuccess) {
        setSuccess(true);
      } else if (status === 403) {
        setError('email', {
          type: 'email',
          message: resError.msg,
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    document.body.classList.toggle('darkClass');

    return () => {
      document.body.classList.remove('darkClass');
    };
  }, []);

  if (success) {
    return <Redirect to="/login" />;
  }

  return (
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
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
