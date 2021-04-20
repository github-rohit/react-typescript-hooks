/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import logo from '../../logo.svg';
import Util from '../../common/Util';

export interface Props {
  createdBy: {
    _id: string;
    name: string;
  };
  createdOn: string;
}

const userDetail: React.SFC<Props> = (props) => {
  const { createdBy, createdOn } = props;

  return (
    <>
      <div className="ui-user">
        <div className="ui-user-img">
          <div className="quarter-circle-top-left" />
          <div className="quarter-circle-top-right" />
          <div className="quarter-circle-bottom-left" />
          <div className="quarter-circle-bottom-right" />
          <div className="ui-user-quarter-circle-inner" />
          <img src={logo} alt="" />
        </div>
        <div className="ui-user-detail">
          <div className="ui-user-title">
            <Link
              to={`/author/${createdBy._id}/${Util.getEncodeURI(
                createdBy.name
              )}`}
            >
              {createdBy.name}
            </Link>
          </div>
          <div className="small text-muted">
            {moment(createdOn).format('LL')}
          </div>
        </div>
      </div>
    </>
  );
};

export default userDetail;
