import React from 'react';

import './userDetails.scss';

const UserDetails = props => (
  <div className="details-container">
    <img alt="user" className="user-image" src={props.img} />
    <p className="user-name">{props.username}</p>
  </div>
);

export default UserDetails;