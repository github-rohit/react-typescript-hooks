/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Aside from '../aside/Aside';
import http from '../../common/http/Post';
import PostReadMarkup from './PostReadMarkup';
import { Post } from '../../types/Post';
import Comments from '../comment/Comments';
import Placeholder from './PlaceholderRead';

type TParams = {
  id: string;
  title: string;
};

type PostReadProps = RouteComponentProps<TParams>;
type PostReadState = {
  post: Post | null;
  errors: boolean;
};
const PostRead: React.FC<PostReadProps> = (props) => {
  const [state, setState] = useState<PostReadState>({
    post: null,
    errors: false,
  });
  const [loading, setLoading] = useState(true);
  const { errors, post } = state;
  const { match } = props;

  function errorText() {
    return <h3 className="text-danger">Something went wrong!</h3>;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { id } = match.params;

      try {
        const response = await http.getById(id);
        setLoading(false);

        if (response.errors) {
          setState((prevState) => {
            return {
              ...prevState,
              errors: true,
            };
          });
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              post: response,
            };
          });
        }
      } catch (ex) {
        setState((prevState) => {
          return {
            ...prevState,
            errors: true,
          };
        });
      }
    })();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-9 pt-5">
          {loading ? (
            <Placeholder />
          ) : errors ? (
            errorText()
          ) : (
            post && <PostReadMarkup post={post} />
          )}
          {post && <Comments id={(post as Post)._id} />}
        </div>
        <div className="col-md-3 pt-5">{!loading && <Aside {...props} />}</div>
      </div>
    </>
  );
};

export default PostRead;
