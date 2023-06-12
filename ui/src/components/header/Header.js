import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import {LoginContext} from '../../context/LoginContext';

import './header.css';


const Header = props => {

  const authorization = useContext(LoginContext);

  const logoutHandler = () => {
    authorization.logout();
  };

  const changePasswordHandler = async () => {

  };

  const UnAuthorizedMenu = () => {
    return (
      <div className="header__log">
        <Link
          className="header__link header__login-link"
          to="/login">Log in</Link>
        <Link
          className="header__link header__register-link"
          to="/registration">Register</Link>
      </div>
    )
  };

  const AuthorizedMenu = () => {
    return (
      <React.Fragment>
      <div className="header__profile">
        <Link className="header__profile-link"
              to={`/profile/${props.userId}`}>My Profile</Link>
      </div>
      <div className="header__log">
        <Link
          to="/"
          className="header__link header__login-link"
          onClick={logoutHandler}>Log out</Link>
        <Link
          onClick={changePasswordHandler}
          className="header__link header__register-link"
          to={`/profile/${props.userId}/change-password`}>Change Password</Link>

        {props.userRole === 'shipper' ? <Link
          className="header__link header__register-link"
          to={`/profile/${props.userId}/delete-account`}>Delete Account</Link> : ''}
      </div>
      </React.Fragment>
    )
  };

    return (
      <header className="header">
        <div className="header__content">
          <div className="header__logo">
            <Link className="header__logo-link" to="/">HoneyTrans</Link>
          </div>
            {!props.isAuthenticated ? <UnAuthorizedMenu/> : <AuthorizedMenu/>}
        </div>
      </header>
    )


};

export default Header;
