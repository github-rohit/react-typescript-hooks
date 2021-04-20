/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import From, { CreatePostData } from './CreateForm';
import Http from '../../common/http/Post';
import { AppStore } from '../../store/Store';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';
import Util from '../../common/Util';

const connector = connect((state: AppStore) => {
  return {
    posts: state.posts.posts,
    user: state.user.details,
  };
});

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{
    type: string;
    id: string;
  }>;

type StateProps = {
  snackbar: CustomSnackbarProps | null;
  error: boolean;
};

const initFormData: CreatePostData = {
  id: '',
  title: '',
  description: '',
  image: '',
  category: 'Uncategorized',
  tags: '',
  status: 'draft',
};

const Create: React.FC<Props> = (props) => {
  const [state, setState] = useState<StateProps>({
    snackbar: null,
    error: false,
  });
  const [loadForm, setLoadForm] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const { match, posts, user, history } = props;
  const { id, type } = match.params;

  async function onSubmit(data: CreatePostData) {
    setState((prevState) => {
      return {
        ...prevState,
        snackbar: null,
      };
    });

    const { status } = data;
    const reqData = {
      ...data,
      status: status.toUpperCase(),
      created_by: user?._id,
    };

    let response;

    if (type === 'edit') {
      response = await Http.patch(id, reqData);
    } else {
      response = await Http.post(reqData);
    }

    if (!response) {
      setState((prevState) => {
        return {
          ...prevState,
          snackbar: {
            message: 'Faild to save post.',
            severity: 'error',
          },
        };
      });
      return;
    }

    const { success, post } = response;

    if (success) {
      if (status.toLowerCase() === 'draft') {
        setState((prevState) => {
          return {
            ...prevState,
            snackbar: {
              message: 'Post updated successfully.',
              severity: 'success',
            },
          };
        });
      } else {
        history.replace(`/post/${post?._id}/${Util.getEncodeURI(post.title)}`);
      }
    }
  }

  function form() {
    const { snackbar, error } = state;
    return (
      <>
        {error && <h3>Someting went wrong.</h3>}
        {snackbar && <Snackbar {...snackbar} />}
        <From defaultValues={formData} onSubmit={onSubmit} />
      </>
    );
  }

  useEffect(() => {
    document.body.classList.toggle('create');

    return () => {
      document.body.classList.remove('create');
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (id) {
        let post = posts.filter(({ _id }) => {
          return _id === id;
        })[0];

        if (!post) {
          post = await Http.getById(id);
        }

        if (!post) {
          setState((prevState) => {
            return {
              ...prevState,
              error: true,
            };
          });
          return;
        }

        const {
          title,
          description,
          image = '',
          category = [''],
          tags,
          status,
        }: any = post;

        setFormData((prevformData) => {
          return {
            ...prevformData,
            title,
            description,
            image,
            category,
            tags,
            status,
          };
        });
        setLoadForm(true);
      } else {
        setLoadForm(true);
      }
    })();
  }, []);

  return loadForm ? form() : <div>Loading...</div>;
};

export default connector(Create);
