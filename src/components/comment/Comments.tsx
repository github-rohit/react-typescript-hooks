import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';

import { SingleFormInput } from '../../common/form/FormInputs';
import Auth from '../../common/AuthService';
import { Comment } from '../../types/Comment';
import Http from '../../common/http/Comment';
import CommentItem from './Comment';

// eslint-disable-next-line import/extensions
import Fields from './Fields.json';
import schema from './Schema';

interface Props {
  id: string;
}

interface Data {
  comment: string;
}

const Comments: React.SFC<Props> = (props) => {
  const [snackbar, setSnackbar] = useState<CustomSnackbarProps | null>(null);
  const { id } = props;
  const [commentList, setCommentList] = useState<Comment[] | null>(null);
  const { register, handleSubmit, formState } = useForm<Data>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { isValid } = formState;

  async function onSubmit(formData: Data) {
    setSnackbar(null);
    const { comment } = formData;

    const response = await Http.post({
      comment,
      postId: id,
      created_by: Auth.user?._id,
    });

    const { success, comment: newComment } = response;

    if (success) {
      setCommentList([newComment, ...(commentList as Comment[])]);
      setSnackbar({
        severity: 'success',
        message: 'Comment added successfully.',
      });
    } else {
      setSnackbar({
        horizontal: 'center',
        autoHideDuration: null,
        severity: 'error',
        message: 'Something went wrong!, Please try later.',
      });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const list = await Http.getById(id);
        setCommentList(list);
      } catch (ex) {
        console.log(ex);
      }
    })();
  }, [id]);

  function getForm() {
    return (
      <>
        <div className="ui-comment-card ui-comment-add">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SingleFormInput field={Fields[0]} register={register} />
            <div className="ui-comment-add">
              <Button
                disableElevation
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Add Comment
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      {snackbar && <Snackbar {...snackbar} />}
      <div className="ui-comment">
        <h4>
          <span className="font-weight-lighter">Total </span>{' '}
          {commentList && commentList?.length}
          <span className="font-weight-lighter">
            {' '}
            Comment{commentList && commentList?.length > 1 ? 's' : ''}
          </span>
        </h4>
        {Auth.user ? (
          getForm()
        ) : (
          <div className="ui-comment-card">
            <i className="fa fa-comment-o" />{' '}
            <span className="small">Login to Write a comment...</span>
          </div>
        )}

        {commentList &&
          commentList?.map((comment: Comment) => {
            // eslint-disable-next-line no-underscore-dangle
            return <CommentItem key={comment._id} {...comment} />;
          })}
      </div>
    </>
  );
};

export default Comments;
