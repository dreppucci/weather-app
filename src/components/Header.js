import React from 'react';

import logo from '../gfx/logo.svg';

class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <div className="header__wrapper">
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">Weather app</h1>
        </div>
      </div>
    );
  }
}

export default Header;