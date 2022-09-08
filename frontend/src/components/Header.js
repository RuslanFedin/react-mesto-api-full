import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo__image.svg';

function Header({ email, onSignOut }) {

  return (
    <header className="header">
      <a className="logo" href="#">
      <img className="logo__image" src={logo} alt="логотип Mesto"/>
      </a>
      <div className='header__userbar'>
        <p className='header__email'>{email}</p>
        <Switch>

          <Route exact={true} path="/">
            <Link
              to="/"
              className="header__link"
              onClick={onSignOut}>Выйти</Link>
          </Route>

          <Route exact={true} path="/sign-in">
            <Link
              to='/sign-up'
              className="header__link">Регистрация</Link>
          </Route>

          <Route exact={true} path="/sign-up">
            <Link
              to='/sign-in'
              className="header__link">Войти</Link>
          </Route>

        </Switch>
      </div>
    </header>
  );
}

export default Header;
