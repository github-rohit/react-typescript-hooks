/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import { AppStore } from '../../store/Store';
import Http from '../../common/http/Post';
import { get } from '../../store/Post';
import PostLists from './List';
import Placeholder from './Placeholder';
import Snackbar, { CustomSnackbarProps } from '../../common/Snackbar';

const connector = connect((state: AppStore) => {
  return {
    posts: state.posts,
  };
});

const PUBLISHED = 'published';
const DRAFT = 'draft';

export type PostStatus = typeof PUBLISHED | typeof DRAFT;

export type PostProps = {
  createdBy?: string;
  status?: PostStatus;
} & RouteComponentProps;

type Props = PostProps & ConnectedProps<typeof connector>;

interface State {
  page: number;
  count: number;
  snackbar: CustomSnackbarProps | null;
}

const initState = {
  page: 1,
  count: 0,
  snackbar: null,
};

const Posts: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initState);
  const [loading, setLoading] = useState(true);
  const { snackbar } = state;
  const {
    posts: propsPosts,
    location,
    match,
    status,
    createdBy,
    dispatch,
  } = props;
  const { posts } = propsPosts;

  function getQuery() {
    const { search } = location;
    const { status: paramsStatus } = match.params as any;
    const query = new URLSearchParams(search);

    if (createdBy) {
      query.set('createdBy', createdBy);
    }

    if (paramsStatus) {
      query.set('status', paramsStatus.toUpperCase());
    }

    return query;
  }

  const getPost = async () => {
    setLoading(true);
    try {
      const query = getQuery();
      let response;

      if (status === 'draft') {
        response = await Http.getMyPost(createdBy as string, query.toString());
      } else {
        response = await Http.get(query);
      }

      dispatch(get(response));
      setLoading(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  const setPage = useCallback(() => {
    const { search } = window.location;
    const query = new URLSearchParams(search);
    const page = query.get('page') || '0';
    const count = parseInt(page, 10) || 1;

    setState({
      ...state,
      page: count,
    });
  }, []);

  function onError(event: Event) {
    (event as any).target.src = '';
  }

  function getCount() {
    const { total } = propsPosts;
    return Math.ceil(total / 12);
  }

  function handleChange(event: React.ChangeEvent<unknown>, page: number) {
    if (state.page !== page) {
      setState({
        ...state,
        page,
      });
      const { search } = window.location;
      const query = new URLSearchParams(search);

      query.set('page', page as any);

      props.history.push(`?${query.toString()}`);
    }
  }

  async function deleteAction(id: string) {
    setState({
      ...state,
      snackbar: null,
    });
    const response = await Http.delete(id);
    const { success, msg } = response;

    if (success) {
      await getPost();
      setPage();
      setState({
        ...state,
        snackbar: {
          message: msg,
          severity: 'success',
        },
      });
    }
  }

  function handelDelete(id: string) {
    const deleteBox = window.confirm('Are you sure you want delete this post.');

    if (deleteBox) {
      deleteAction(id);
    }
  }

  function noRecord() {
    const { search } = location;
    const searchParams = new URLSearchParams(search);

    const category = searchParams.get('category');
    const qParam = searchParams.get('q');

    return (
      <div className="text-center col">
        <h1>:( OOPS</h1>
        <h3>
          {category ? (
            <>
              No record found for{' '}
              <span className="text-danger">{category}</span> Category.
            </>
          ) : qParam ? (
            <>
              Your search - <span className="text-danger">{qParam} </span>- did
              not match any documents.
            </>
          ) : (
            'No record found.'
          )}
        </h3>
      </div>
    );
  }

  function post() {
    return (
      <>
        <PostLists
          createdBy={createdBy}
          posts={posts}
          status={status}
          onError={onError}
          onDelete={handelDelete}
        />
        <div className="ui-pagination">
          {getCount() ? (
            <Pagination
              page={state.page}
              count={getCount()}
              showFirstButton
              showLastButton
              onChange={handleChange}
            />
          ) : (
            ''
          )}
        </div>
      </>
    );
  }

  useEffect(() => {
    (async () => {
      await getPost();
      setPage();
    })();
  }, [location.search, status]);

  return (
    <>
      {snackbar && <Snackbar {...(snackbar as CustomSnackbarProps)} />}
      {loading ? <Placeholder /> : posts && posts.length ? post() : noRecord()}
    </>
  );
};

export default connector(Posts);
