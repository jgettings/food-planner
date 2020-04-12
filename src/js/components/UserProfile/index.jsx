import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import md5 from 'md5';
import SettingsDialog from './SettingsDialog';


const gravatar = (email) => `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}`;

const UserProfile = ({ userEmail }) => {
  const [open, setOpen] = useState(false);

  return (
    <div id="user-settings">
      <IconButton
        alt="Edit User Settings"
        onClick={() => setOpen(true)}
      >
        {/* can probably combine these */}
        {userEmail && <Avatar alt={userEmail} src={gravatar(userEmail)} />}
        {!userEmail && <SettingsIcon />}
      </IconButton>
      <SettingsDialog open={open} close={() => setOpen(false)} />
    </div>
  );
};

UserProfile.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => state.userProfile;

export default connect(mapStateToProps)(UserProfile);
