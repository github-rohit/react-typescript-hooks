import * as React from 'react';
import { NavLink } from 'react-router-dom';

const sideNav: React.FC = () => {
  return (
    <ul className="ui-side-nav">
      <li>
        <NavLink to="/my/posts/published" activeClassName="selected">
          Published
        </NavLink>
      </li>
      <li>
        <NavLink to="/my/posts/draft" activeClassName="selected">
          Draft
        </NavLink>
      </li>
    </ul>
  );
};

export default sideNav;
