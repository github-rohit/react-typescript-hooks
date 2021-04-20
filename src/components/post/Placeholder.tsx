import * as React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

type Props = IContentLoaderProps;

const placeholder: React.FC<Props> = () => {
  const loaderArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <ul className="list-unstyled">
        {loaderArray.map((i) => {
          return (
            <li key={i}>
              <article className="ui-post">
                <ContentLoader
                  width="100%"
                  height="204"
                  speed={2}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="23" cy="23" r="23" />
                  <rect x="54" y="8" rx="4" ry="4" width="300" height="13" />
                  <rect x="54" y="24" rx="3" ry="3" width="250" height="10" />
                  <rect x="0" y="54" rx="3" ry="3" width="100%" height="100" />
                  <rect x="0" y="164" rx="3" ry="3" width="90%" height="24" />
                  <rect x="0" y="194" rx="3" ry="3" width="100" height="10" />
                </ContentLoader>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default placeholder;
