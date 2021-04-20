import * as React from 'react';
import UserImg from '../../images/user.png';
import { User } from '../../types/User';

type Props = User & {
  total: number;
};

function getlink(title: string, href: string, icon: string) {
  return (
    <p>
      <i className={`fa ${icon}`} />{' '}
      <a title={title} rel="noopener noreferrer" target="_blank" href={href}>
        {href}
      </a>
    </p>
  );
}

const authorMarkup: React.SFC<Props> = ({ name, website, total, country }) => {
  return (
    <>
      <div className="ui-author-avatar">
        <img className="img-fluid" src={UserImg} alt="" />
      </div>
      <div className="ui-author-details">
        <h5 className="mb-1">{name}</h5>
        <p className="small">
          <i className="fa fa-clone" /> <strong>{total}</strong> Post
        </p>
        {country && (
          <p className="small">
            <i className="fa fa-home" /> {country}
          </p>
        )}
        <p>&nbsp;</p>
        {website && getlink('Website', website, 'fa-newspaper-o')}
      </div>
    </>
  );
};

export default authorMarkup;
