import React from 'react';
import { connect } from 'react-redux';

const Profile = ({ accessToken, user }) => {
  // Check if accessToken is available; if not, load from localStorage as a fallback
  const token = accessToken || localStorage.getItem('accessToken');

  if (!token) {
    return <div>Not authenticated. Please log in.</div>;
  }

  // Assuming 'user' contains other user profile information
  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
     
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.sessionReducer.accessToken,  // Adjust according to your actual state structure
  user: state.userReducer.user  // Adjust this path based on your state structure
});

export default connect(mapStateToProps)(Profile);