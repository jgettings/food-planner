import React from 'react';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import md5 from 'md5';
import AppBar from '../AppBar';
import configureStore from '../../configure-store';

describe('User Profile and Settings', () => {
  let bar;
  let avatarButton;
  let mount;

  before(() => {
    mount = createMount({ strict: false });
  });

  beforeEach(() => window.localStorage.clear());
  afterEach(() => bar && bar.unmount());

  describe('When not logged in', () => {
    beforeEach(() => {
      bar = mount(<Provider store={configureStore()}><AppBar /></Provider>);
      avatarButton = bar.find('#user-settings button');
    });
    it('Will show a settings gear icon in the topbar', () => {
      expect(avatarButton.length).to.not.equal(0);

      const foundIcon = avatarButton.first().find('svg');
      expect(foundIcon.html()).to.equal(mount(<SettingsIcon />).html());
    });
  });

  describe('When we have user information in local storage', () => {
    beforeEach(() => {
      window.localStorage.food_planner_userProfile = JSON.stringify({ userEmail: 'other@Email.place ' });

      bar = mount(<Provider store={configureStore()}><AppBar /></Provider>);

      avatarButton = bar.find('#user-settings button').first();
    });

    it('will display the user\'s gravatar instead of a settings gear in the topbar', () => {
      expect(avatarButton.length).to.not.equal(0);

      // trimmed and lowercased, md5-ed then gravatar link
      expect(avatarButton.find('img').prop('src')).to.equal(`https://www.gravatar.com/avatar/${md5('other@email.place')}`);
    });
  });

  describe('Settings Dialog: Open and Close', () => {
    const dialogIsOpen = () => bar.find(Dialog).filter('#user-settings-dialog').prop('open');

    beforeEach(() => {
      bar = mount(<Provider store={configureStore()}><AppBar /></Provider>);
      avatarButton = bar.find('#user-settings button').first();
    });
    it('will not be open on load', () => {
      expect(dialogIsOpen()).to.be.false;
    });
    it('will open when the user avatar is clicked', () => {
      avatarButton.simulate('click');

      expect(dialogIsOpen()).to.be.true;
    });

    it('will close the open dialog when the close button is clicked', () => {
      // Open it first
      avatarButton.simulate('click');
      expect(dialogIsOpen()).to.be.true;

      // Then click the button
      const closeButton = bar.find(Dialog).filter('#user-settings-dialog').find(Button).filter('.close-button');
      closeButton.simulate('click');

      // Now it is closed
      expect(dialogIsOpen()).to.be.false;
    });
  });
});
