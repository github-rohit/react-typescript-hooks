import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Post, { PostStatus } from '../../components/post/Post';
import SideNav from './SideNav';
import { AppStore } from '../../store/Store';
import { User } from '../../types/User';

const PUBLISHED = 'published';
const DRAFT = 'draft';

const connector = connect((state: AppStore) => {
  return {
    user: state.user.details,
  };
});

type Props = RouteComponentProps<{
  status: PostStatus;
}> &
  ConnectedProps<typeof connector>;

interface State {
  status: PostStatus;
}

const MyPosts: React.FC<Props> = (props) => {
  const { match, user } = props;
  const { status } = match.params;
  const [currentStatus, setCurrentStatus] = useState(status);
  const { _id } = (user as User) || {};

  function statuse() {
    return status === PUBLISHED || status === DRAFT || false;
  }

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  if (!statuse()) {
    return <Redirect to="/not-found" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          {_id ? (
            <Post createdBy={_id} status={currentStatus} {...props} />
          ) : (
            'loading'
          )}
        </div>
        <div className="col-md-3">
          <div className="mt-4">
            <div className="aside">
              <SideNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(MyPosts);
