import * as React from 'react';
import { Link } from 'react-router-dom';

export interface CategoryProps {
  list: string[];
}

const category: React.SFC<CategoryProps> = (props) => {
  return (
    <React.Fragment>
      {props.list.map((c: string) => (
        <Link key={c} to={`/?category=${c}`}>
          <span className="badge badge-pill badge-secondary">{c}</span>
        </Link>
      ))}
    </React.Fragment>
  );
};

export default category;
