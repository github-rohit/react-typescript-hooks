import * as React from 'react';
import { Post } from '../../types/Post';
import UserDetails from './PostUserDetail';
import Category from './Category';

type PostProps = { post: Post };

const postReadMarkup: React.FC<PostProps> = (props) => {
  const { post } = props;
  const {
    title,
    description,
    image,
    category,
    created_on: createdOn,
    created_by: createdBy,
  } = post;

  return post ? (
    <>
      <div className="ui-post-page">
        <div className="mb-3">
          <UserDetails createdOn={createdOn} createdBy={createdBy} />
        </div>
        <h1 className="post-title">{title}</h1>
        <div className="mb-3">
          <Category list={category} />
        </div>
        <hr />
        {image && (
          <div className="description">
            <img src={image} alt="" />
          </div>
        )}
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </>
  ) : (
    <span />
  );
};

export default postReadMarkup;
