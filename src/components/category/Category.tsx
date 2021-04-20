import * as React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { count: 0, _id: '59f5fceff36d28236307eb23', category: 'Technology' },
  { count: 0, _id: '59f5fd5af36d28236307eb2d', category: 'Music' },
  { count: 0, _id: '59f5fdaaf36d28236307eb36', category: 'Fashion' },
  { count: 0, _id: '59f5fdb5f36d28236307eb37', category: 'Movie' },
  { count: 0, _id: '59f5fdc2f36d28236307eb39', category: 'Law' },
  { count: 0, _id: '59f5fdcbf36d28236307eb3b', category: 'History' },
  { count: 0, _id: '5a6b5fcc734d1d6303187348', category: 'Uncategorized' },
];

const Category: React.FC = () => {
  function searchParams() {
    return new URLSearchParams(window.location.search);
  }

  function getSelectedCategoryQuery() {
    const search = searchParams();
    return search.get('category');
  }

  function handelClearCatSerachParam() {
    const search = searchParams();
    search.delete('category');
  }

  const cat = getSelectedCategoryQuery();

  return (
    <ul className="ui-side-nav">
      {cat && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="clear" onClick={handelClearCatSerachParam} to="">
          Clear
          <i className="fa fa-window-close" />
        </Link>
      )}
      {categories.map(({ _id, category }) => {
        return (
          <li key={_id}>
            <Link
              className={category === cat ? 'selected' : ''}
              to={`/?category=${category}`}
            >
              {category}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Category;
