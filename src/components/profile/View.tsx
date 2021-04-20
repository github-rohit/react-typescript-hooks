/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@material-ui/core';
import { Email, Language, LocationOn } from '@material-ui/icons';

import userImage from '../../images/user.png';

import Auth from '../../common/AuthService';
import Http from '../../common/http/User';
import { set } from '../../store/User';
import { AppStore } from '../../store/Store';
import { User } from '../../types/User';
import Logout from '../logout/Logout';

const connector = connect((state: AppStore) => {
  return {
    user: state.user.details,
  };
});

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

const socialClasses = {
  facebook: 'facebook-f',
  twitter: 'twitter',
  google_plus: 'google-plus',
  linkedIn: 'linkedin',
  instagram: 'instagram',
  tumblr: 'tumblr',
  pinterest: 'pinterest-p',
};

function getSocialLink(key: string, clsName: string, value: string) {
  return (
    <p key={key}>
      {value ? (
        <a rel="noopener noreferrer" href={value} target="_blank">
          <i className={`fa fa-${clsName}`} />
          {value}
        </a>
      ) : (
        <>
          <a>
            <i className={`fa fa-${clsName}`} /> -
          </a>
        </>
      )}
    </p>
  );
}

function getSocialLinks(user: User) {
  const socialLinks: JSX.Element[] = [];

  for (const [key, clsName] of Object.entries(socialClasses)) {
    const value = (user as any)[key];
    socialLinks.push(getSocialLink(key, clsName, value));
  }

  return socialLinks;
}

const View: React.FC<Props> = (props) => {
  const { user, dispatch } = props;
  const { name, email, aboutme, website, country } = user || {};

  useEffect(() => {
    (async () => {
      const { _id } = Auth.user as User;
      const response = await Http.getById(_id);

      if (!response) {
        return;
      }

      dispatch(set(response));
    })();
  }, [dispatch]);

  if (!name) {
    return <div />;
  }

  return (
    <div className="profile-container pt-5">
      <div className="profile-avatar">
        <img className="img-fluid" src={userImage} alt="user" />
      </div>
      <div className="profile-base-info">
        <h2>{name}</h2>
        {email && (
          <p title="email">
            <Email fontSize="small" color="action" /> {email}
          </p>
        )}
        {website && (
          <p title="Website">
            <Language fontSize="small" color="action" />
            &nbsp;
            <a href={website} rel="noopener noreferrer" target="_blank">
              {website}
            </a>
          </p>
        )}
        {country && (
          <p title="Location">
            <LocationOn fontSize="small" color="action" /> {country}
          </p>
        )}
      </div>
      <div className="profile-action-btn">
        <Button
          className="w-100 mb-3"
          variant="outlined"
          color="primary"
          component={Link}
          to="/my/profile/edit"
        >
          Edit Profile
        </Button>
        <Button
          className="w-100 mb-3"
          variant="outlined"
          color="primary"
          component={Link}
          to="/my/profile/change-password"
        >
          Change Password
        </Button>
        <Logout />
      </div>
      <div className="profile-aboutme">
        <h4>ABOUT ME</h4>
        <p>{aboutme || '-'}</p>
      </div>
      <div className="profile-social-media">
        <h4>SOCIAL MEDIA</h4>
        {user && getSocialLinks(user)}
      </div>
    </div>
  );
};

export default connector(View);
