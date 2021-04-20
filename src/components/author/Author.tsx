import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { User } from '../../types/User';
import Http from '../../common/http/User';
import Posts from '../../components/post/Post';
import AuthorMarkup from './AuthorMarkup';
import { AppStore } from '../../store/Store';

const connector = connect((state: AppStore) => {
  return { posts: state.posts };
});

type AuthorProps = RouteComponentProps<{
  id: string;
  name: string;
}> &
  ConnectedProps<typeof connector>;

export interface AuthorState {
  author: User | null;
}

const Author: React.FC<AuthorProps> = (props) => {
  const [author, setAuthor] = useState<User | null>(null);
  const {
    match,
    posts: { total },
  } = props;
  const { id } = match.params;

  useEffect(() => {
    (async () => {
      try {
        const response = await Http.getById(id);
        setAuthor(response);
      } catch (ex) {
        //
      }
    })();
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-md-3 ui-author-container">
          {author && <AuthorMarkup total={total} {...author} />}
        </div>
        <div className="col-md-9 pl-5">
          <Posts createdBy={id} {...props} />
        </div>
      </div>
    </>
  );
};

export default connector(Author);
