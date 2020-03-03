import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import localStorage from 'local-storage';
import md5 from 'md5';
import SettingsDialog from './SettingsDialog';


const gravatar = (email) => `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}`;

export default () => {
  const [open, setOpen] = useState(false);
  const savedUserEmail = localStorage.get('user.email') || '';
  // move to redux or something for sharings
  const [userEmail, setUserEmail] = useState(savedUserEmail);

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
      <SettingsDialog
        open={open}
        close={() => setOpen(false)}
        onUserEmailUpdate={(e) => setUserEmail(e)}
      />
    </div>
  );
};
