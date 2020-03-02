import React from 'react';
import { expect } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import localStorage from 'local-storage';
import AppBar from '../AppBar';

describe('User Profile and Settings', () => {
  let bar;
  let avatarButton;
  let mount;

  const settingsDialog = () => bar.find(Dialog).filter('#user-settings-dialog');

  const dialogIsOpen = () => settingsDialog().prop('open');

  const expectIconToBeInElement = (expectedIcon, parentElement) => {
    // This should probably check any svgs within the parent but it's only checking the first one
    const icon = mount(expectedIcon);

    const foundIcon = parentElement.find('svg');
    expect(foundIcon.length).to.not.equal(0);

    expect(foundIcon.html()).to.equal(icon.html());
  };

  beforeEach(() => {
    mount = createMount({ strict: false });
    localStorage.clear();
  });
  afterEach(() => {
    if (bar) {
      bar.unmount();
    }
  });

  describe('When not logged in', () => {
    beforeEach(() => {
      bar = mount(<AppBar />);
      avatarButton = bar.find('#user-settings button').first();
    });
    it('Will show a settings gear icon in the topbar', () => {
      expect(avatarButton.length).to.not.equal(0);
      expectIconToBeInElement(<SettingsIcon />, avatarButton);
    });
  });

  describe('When we have user information in local storage', () => {
    beforeEach(() => {
      localStorage.set('user.email', 'other@email.place');
      bar = mount(<AppBar />);
      avatarButton = bar.find('#user-settings button').first();
    });

    it('will display the user\'s gravatar instead of a settings gear in the topbar'); // gravatar

    describe('Settings Dialog (when open)', () => {
      beforeEach(() => {
        avatarButton.simulate('click');
        expect(dialogIsOpen()).to.be.true;
      });

      it('will show the email address from localstorage', () => {
        const emailInput = bar.find('#user-email').first();
        expect(emailInput.prop('value')).to.equal('other@email.place');
      });

      describe('Reset button', () => {
        const alert = () => bar.find(Dialog).filter('#user-settings-confirmation-alert');

        beforeEach(() => {
          const closeButton = settingsDialog().find(Button).filter('.reset-button');
          closeButton.simulate('click');
        });

        it('will keep the main settings dialog open', () => {
          expect(dialogIsOpen()).to.be.true;
        });

        it('will open a confirmation', () => {
          expect(alert().prop('open')).to.be.true;
        });

        describe('on confirmation', () => {
          beforeEach(() => {
            const confirmReset = alert().find(Button).filter('.reset-button');
            confirmReset.simulate('click');
          });

          it('will close the confirmation', () => {
            expect(alert().prop('open')).to.be.false;
          });

          it('will clear localstorage', () => {
            const storedValue = localStorage.get('user.email');
            expect(storedValue).to.be.null;
          });

          it('will clear the user email form', () => {
            const emailInput = bar.find('#user-email').first();
            expect(emailInput.prop('value')).to.equal('');
          });
        });

        describe('on cancel', () => {
          beforeEach(() => {
            const confirmReset = alert().find(Button).filter('.close-button');
            confirmReset.simulate('click');
          });

          it('will close the confirmation when it is canceled', () => {
            expect(alert().prop('open')).to.be.false;
          });

          it('will not reset the settings', () => {
            const storedValue = localStorage.get('user.email');
            expect(storedValue).to.not.be.null;
          });
        });
      });
    });
  });

  describe('Settings Dialog', () => {
    beforeEach(() => {
      bar = mount(<AppBar />);
      avatarButton = bar.find('#user-settings button').first();
    });
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
        avatarButton.simulate('click');
        expect(dialogIsOpen()).to.be.true;
      });
      it('will close when the close button is clicked', () => {
        const closeButton = settingsDialog().find(Button).filter('.close-button');
        closeButton.simulate('click');

        expect(dialogIsOpen()).to.be.false;
      });

      it('will let the user enter an email address to "log in"', () => {
        const emailInput = bar.find('#user-email').first();
        expect(emailInput.prop('value')).to.equal('');

        emailInput.find('input').simulate('change', { target: { value: 'stuff@gmail.com' } });

        const updatedEmailInput = bar.find('#user-email').first();
        expect(updatedEmailInput.prop('value')).to.equal('stuff@gmail.com');

        const emailForm = bar.find('#user-email-form').first();
        emailForm.simulate('submit');

        const storedValue = localStorage.get('user.email');
        expect(storedValue).to.equal('stuff@gmail.com');
      });

      describe('user email update button', () => {
        it('will not be active on load', () => {
          const updateButton = settingsDialog().find('#update-user-email').first();
          expect(updateButton.prop('disabled')).to.be.true;
        });
        it('will become active when the input changes', () => {
          const emailInput = bar.find('#user-email').first();
          expect(emailInput.prop('value')).to.equal('');

          emailInput.find('input').simulate('change', { target: { value: 'anything' } });

          const updateButton = settingsDialog().find('#update-user-email').first();
          expect(updateButton.prop('disabled')).to.be.false;
        });
        it('will not become active if the input changes but the value is the same', () => {
          const emailInput = bar.find('#user-email').first();
          expect(emailInput.prop('value')).to.equal('');

          emailInput.find('input').simulate('change', { target: { value: '' } });

          const updateButton = settingsDialog().find('#update-user-email').first();
          expect(updateButton.prop('disabled')).to.be.true;
        });
        it('will not be active if the settings are reset', () => {
          const emailInput = bar.find('#user-email').first();
          expect(emailInput.prop('value')).to.equal('');

          emailInput.find('input').simulate('change', { target: { value: 'anything' } });

          const updateButton = settingsDialog().find('#update-user-email').first();
          expect(updateButton.prop('disabled')).to.be.false;

          // Reset settings
          const closeButton = settingsDialog().find(Button).filter('.reset-button');
          closeButton.simulate('click');
          const confirmReset = bar.find(Dialog).filter('#user-settings-confirmation-alert').find(Button).filter('.reset-button');
          confirmReset.simulate('click');

          const updatedUpdateButton = settingsDialog().find('#update-user-email').first();
          expect(updatedUpdateButton.prop('disabled')).to.be.true;
        });
      });
    });
  });
});
