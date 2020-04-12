import React from 'react';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import SettingsDialog from './SettingsDialog';
import configureStore from '../../configure-store';

describe('Settings Dialog', () => {
  let mount;
  let settingsDialog;
  let app;

  before(() => {
    mount = createMount({ strict: false });
  });

  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.food_planner_userProfile = JSON.stringify({ userEmail: 'other@Email.place ' });

    app = mount(
      <Provider store={configureStore()}>
        <SettingsDialog open close={() => {}} />
      </Provider>,
    );
    settingsDialog = app.find(Dialog).filter('#user-settings-dialog');
  });
  after(() => app && app.unmount());

  const getEmailFromLocalStorage = () => {
    const profile = JSON.parse(localStorage.getItem('food_planner_userProfile'));
    return profile && profile.userEmail;
  };

  it('will show the email address from localstorage', () => {
    const emailInput = settingsDialog.find('#user-email').first();
    expect(emailInput.prop('defaultValue')).to.equal('other@Email.place ');
  });

  describe('Reset button', () => {
    const alert = () => app.find(Dialog).filter('#user-settings-confirmation-alert');

    beforeEach(() => {
      const closeButton = settingsDialog.find(Button).filter('.reset-button');
      closeButton.simulate('click');
    });

    it('will keep the main settings dialog open', () => {
      expect(settingsDialog.prop('open')).to.be.true;
    });

    it('will open a confirmation', () => {
      expect(alert().prop('open')).to.be.true;
    });

    describe('on confirmation', () => {
      beforeEach(() => {
        const confirmReset = alert().find(Button).filter('.confirm-button');
        confirmReset.simulate('click');
      });

      it('will close the confirmation', () => {
        expect(alert().prop('open')).to.be.false;
      });

      it('will clear localstorage', () => {
        const storedValue = getEmailFromLocalStorage();
        expect(storedValue).to.be.null;
      });

      it('will clear the user email form', () => {
        const emailInput = app.find('#user-email input').first();
        const value = emailInput.getDOMNode().getAttribute('value');
        expect(value).to.equal('');
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
        const storedValue = getEmailFromLocalStorage();
        expect(storedValue).to.not.be.null;
      });
    });
  });
});
