import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ArrowBack } from '@material-ui/icons';
import './NotFound.scss';

const notFound: React.SFC = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="page-not-found">
            <h1>404</h1>
            <h3>Page not found</h3>
            <p>We&apos;re sorry the page you requested could not be found.</p>
            <Button component={Link} to="/" variant="text" color="primary">
              <ArrowBack />
              GO BAck to HOME
            </Button>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    </>
  );
};

export default notFound;
