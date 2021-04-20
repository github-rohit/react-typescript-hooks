/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Button, Menu } from '@material-ui/core';
import { PostAddOutlined } from '@material-ui/icons';
import { AppStore } from '../../store/Store';
import Util from '../../common/Util';
import logo from '../../logo.svg';
import Logout from '../logout/Logout';
import { User } from '../../types/User';

const connector = connect((state: AppStore) => ({
  user: state.user.details,
}));

export type NavbarProps = ConnectedProps<typeof connector>;

const Navbar: React.SFC<NavbarProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setanchorEl] = useState<any>(null);

  const element = useRef(null);

  function userAvatarText(name: string): string {
    let text = '';

    if (name.length) {
      const arr: string[] = name.split(' ');
      text += arr[0].charAt(0);
      text += arr.length > 1 ? (arr as any).pop().charAt(0) : '';
    }

    return text;
  }

  function handleClick(event: React.MouseEvent) {
    setanchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setanchorEl(null);
  };

  useEffect(() => {
    Util.watchBodyScroll(element);
  }, []);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <header ref={element} className="navbar mb-4">
      <nav className="container">
        <div className="navbar-header">
          <NavLink className="navbar-brand" to="/">
            <img height="40" src={logo} alt="nirmalrohit.com" />
          </NavLink>
        </div>
        <ul className="navbar-nav mr-auto navbar-nav-left">
          <li>
            <NavLink to="/" exact activeClassName="active">
              HOME
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/my/posts/published" activeClassName="active">
                MY POSTS
              </NavLink>
            </li>
          )}
        </ul>
        {user ? (
          <>
            <Button
              className="menu-write-btn"
              variant="outlined"
              color="primary"
              size="small"
              component={Link}
              to="/my/post/new"
              startIcon={<PostAddOutlined />}
            >
              Write
            </Button>
            <ul className="nav navbar-nav navbar-right mobile-hide">
              <li>
                <a
                  className="user-avatar rounded-circle"
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  onClick={handleClick}
                >
                  <span>{userAvatarText(user?.name)}</span>
                </a>
              </li>
            </ul>
            <Menu
              className="user-dropdown"
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <li>
                <NavLink
                  onClick={handleClose}
                  to="/my/profile/view"
                  className="d-flex"
                >
                  <div className="user-avatar rounded-circle align-self-center col">
                    <span>{userAvatarText(user.name)}</span>
                  </div>
                  <div className="col">
                    <div className="uname">{user.name}</div>
                    <div className="email small">{user.email}</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </Menu>
          </>
        ) : (
          <>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/login" activeClassName="active">
                  LOGIN
                </NavLink>
              </li>
            </ul>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              component={Link}
              to="/sign-up"
            >
              SIGNUP
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default connector(Navbar);
