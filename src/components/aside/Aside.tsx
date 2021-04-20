import React, { useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SearchPost from '../form/SearchPost';
import Category from '../category/Category';

type AsideProps = RouteComponentProps;

const Aside: React.FC<AsideProps> = (props) => {
  const refelement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = refelement.current!;
    const { top } = element.getBoundingClientRect();
    element.style.top = `${top}px`;
  }, []);

  return (
    <>
      <div ref={refelement} className="aside">
        <SearchPost {...props} />
        <Category />
      </div>
    </>
  );
};

export default Aside;
