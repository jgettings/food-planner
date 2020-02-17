import React from 'react';
import { expect } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AppBar from '../AppBar';

describe('User Profile and Settings', () => {
  let mount;
  beforeEach(() => {
    mount = createMount({ strict: false });
  });

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
    if (bar) {
      bar.unmount();
    }
  });

  describe('When not logged in', () => {
    it('Will show a settings gear icon in the topbar', () => {
      expect(avatarButton.length).to.not.equal(0);
      expectIconToBeInElement(<SettingsIcon />, avatarButton);
    });
  });

  xdescribe('When we have user information in local storage', () => {
    it('will display the user\'s gravatar instead of a settings gear in the topbar');
    it('will display more detailed information in the settings dialog');
  });

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

    describe('when the dialog is open', () => {
      beforeEach(() => {
        // open via the avatar button and confirm that it is open
        avatarButton.simulate('click');
        expect(dialogIsOpen()).to.be.true;
      });
      it('will close when the close button is clicked', () => {
        const closeButton = bar.find(Dialog).find(Button).filter('.close-button');
        closeButton.simulate('click');

        expect(dialogIsOpen()).to.be.false;
      });

      it('will let the user enter an email address to "log in"', () => {
        const emailInput = bar.find('#user-email').first();
        expect(emailInput.prop('value')).to.equal(''); // empty because no one is logged in

        // test that we put this email address somewhere
        emailInput.find('input').simulate('change', { target: { value: 'stuff@gmail.com' } });

        const updatedEmailInput = bar.find('#user-email').first();
        expect(updatedEmailInput.prop('value')).to.equal('stuff@gmail.com');

        const emailForm = bar.find('#user-email-form').first();
        emailForm.simulate('submit'); // clicking on the button does not log to the console
      });

      it('will use the email address from localstorage'); // https://programmingwithmosh.com/react/localstorage-react/
      it('will not let them enter an invalid email address');
      it('will not submit if the email is empty or invalid');

    });
  });
});
