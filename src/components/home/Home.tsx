import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Post from '../post/Post';
import Aside from '../aside/Aside';

export type HomeProps = RouteComponentProps;

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="row">
      <div className="col-md-9">
        <Post {...props} />
      </div>
      <div className="col-md-3">
        <div className="mt-4">
          <Aside {...props} />
        </div>
      </div>
    </div>
  );
};

export default Home;
