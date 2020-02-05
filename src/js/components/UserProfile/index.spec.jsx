import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AppBar from '../AppBar';


describe('User Profile and Settings', () => {
  const expectIconToBeInElement = (expectedIcon, parentElement) => {
    // This should probably check any svgs within the parent but it's only checking the first one
    const icon = mount(expectedIcon);

    const foundIcon = parentElement.find('svg');
    expect(foundIcon.length).to.not.equal(0);

    expect(foundIcon.html()).to.equal(icon.html());
  };

  let bar;
  let avatarButton;
  beforeEach(() => {
    bar = mount(<AppBar />);
    avatarButton = bar.find('#user-settings button').first();
  });
  afterEach(() => {
    bar.unmount();
  });

  describe('When not logged in', () => {
    it('Will show a settings gear icon in the topbar', () => {
      expect(avatarButton.length).to.not.equal(0);
      expectIconToBeInElement(<SettingsIcon />, avatarButton);
    });
  });

  xdescribe('When we have a gravatar login');

  describe('Settings Dialog', () => {
    const dialogIsOpen = () => bar.find(Dialog).prop('open');
    it('will not be open on load', () => {
      expect(dialogIsOpen()).to.be.false;
    });
    it('will open when the user avatar is clicked', () => {
      expect(dialogIsOpen()).to.be.false;

      avatarButton.simulate('click');

      expect(dialogIsOpen()).to.be.true;
    });
    it('will close when the close button is clicked', () => {
      // open via the avatar button and confirm that it is open
      avatarButton.simulate('click');
      expect(dialogIsOpen()).to.be.true;

      // Close the dialog
      const closeButton = bar.find(Dialog).find(Button).filter('.close-button');
      closeButton.simulate('click');

      expect(dialogIsOpen()).to.be.false;
    });
  });
});
