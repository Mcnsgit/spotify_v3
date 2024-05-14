import React, { Component } from 'react';

// import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';

import './header.scss';

class Header extends Component {
  render = () => (
    <div className="main-header">
      <Search />
    </div>
  );
}

export default Header;

// {/* <UserDetails username={this.props.username} img={this.props.img} /> */}