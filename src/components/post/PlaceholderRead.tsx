import * as React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

type Props = IContentLoaderProps;

const placeholder: React.FC<Props> = () => {
  return (
    <>
      <ContentLoader
        width="100%"
        height="600"
        speed={2}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="23" cy="23" r="23" />
        <rect x="54" y="8" rx="4" ry="4" width="300" height="13" />
        <rect x="54" y="24" rx="3" ry="3" width="250" height="10" />
        <rect x="0" y="64" rx="3" ry="3" width="90%" height="24" />
        <rect x="0" y="94" rx="3" ry="3" width="100" height="10" />
        <rect x="0" y="120" rx="3" ry="3" width="100%" height="200" />
        <rect x="0" y="340" rx="3" ry="3" width="100%" height="10" />
        <rect x="0" y="356" rx="3" ry="3" width="100%" height="10" />
        <rect x="0" y="372" rx="3" ry="3" width="100%" height="10" />
        <rect x="0" y="388" rx="3" ry="3" width="50%" height="10" />
        <rect x="0" y="428" rx="3" ry="3" width="100%" height="10" />
        <rect x="0" y="444" rx="3" ry="3" width="100%" height="10" />
        <rect x="0" y="460" rx="3" ry="3" width="50%" height="10" />
      </ContentLoader>
    </>
  );
};

export default placeholder;
