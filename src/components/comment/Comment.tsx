import * as React from 'react';
import { Comment } from '../../types/Comment';
import UserDetails from '../post/PostUserDetail';

type Props = Comment;

const commentMarkup: React.FC<Props> = ({
  comment,
  created_by: createdBy,
  created_on: createdOn,
}) => {
  return (
    <>
      <div className="ui-comment-card">
        <div>
          <UserDetails createdBy={createdBy} createdOn={createdOn} />
        </div>
        <div className="ui-comment-text pt-4">{comment}</div>
      </div>
    </>
  );
};

export default commentMarkup;
