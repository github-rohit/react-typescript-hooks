import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Email, VpnKey } from '@material-ui/icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import userImage from '../../images/user.png';

import FormInputs from '../../common/form/FormInputs';
import { User } from '../../types/User';
import Fields from './Fields.json';
import schema from './Schema';

type Props = {
  defaultValues: User;
  onSubmit: SubmitHandler<User>;
};

type Data = User;

const EditForm: React.FC<Props> = (props) => {
  const { defaultValues, onSubmit } = props;
  const { register, errors, handleSubmit, watch } = useForm<Data>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { name, email } = defaultValues;
  const watchName = watch('name', name);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-container pt-5">
          <div className="profile-avatar">
            <img className="img-fluid" src={userImage} alt="user" />
            <p className="pt-3">
              <Button
                className="w-100"
                size="small"
                color="primary"
                component={Link}
                to="/my/profile/change-password"
                startIcon={<VpnKey />}
              >
                Change Password
              </Button>
            </p>
          </div>
          <div className="profile-base-info">
            <h2>{watchName}</h2>
            <p title="email">
              <Email fontSize="small" color="action" /> {email}
            </p>
            <FormInputs
              register={register}
              fields={[...Fields].slice(0, 5)}
              errors={errors}
            />
          </div>
          <div className="profile-social-media">
            <h4>SOCIAL MEDIA</h4>
            <FormInputs
              register={register}
              fields={[...Fields].slice(5)}
              errors={errors}
            />
          </div>
        </div>

        <div className="fixed-wrapper-btns">
          <div className="profile-container container text-left">
            <div />
            <div>
              <Button type="submit" variant="outlined" color="primary">
                Update profile
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditForm;
