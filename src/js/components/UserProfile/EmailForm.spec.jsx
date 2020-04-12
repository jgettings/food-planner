import React from 'react';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
import EmailForm from './EmailForm';
import configureStore from '../../configure-store';

describe('EmailForm', () => {
  let mount;
  let form;
  let store;

  before(() => {
    mount = createMount({ strict: false });
  });

  const getEmailFromLocalStorage = () => {
    const profile = JSON.parse(localStorage.getItem('food_planner_userProfile'));
    return profile && profile.userEmail;
  };

  describe('when there is nothing in local storage', () => {
    beforeEach(() => {
      window.localStorage.clear();
      store = configureStore();
      form = mount(<Provider store={store}><EmailForm /></Provider>);
    });
    afterEach(() => form && form.unmount());

    describe('when the user enters and saves an email address', () => {
      beforeEach(() => {
        const emailInput = form.find('#user-email').first();
        expect(emailInput.prop('defaultValue')).to.equal('');

        emailInput.find('input').simulate('change', { target: { value: 'stuff@gmail.com' } });

        const emailForm = form.find('#user-email-form').first();
        emailForm.simulate('submit');
      });

      it('will save the email address in local storage', () => {
        const updatedEmailInput = form.find('#user-email').first();
        expect(updatedEmailInput.prop('defaultValue')).to.equal('stuff@gmail.com');

        const storedValue = getEmailFromLocalStorage();
        expect(storedValue).to.equal('stuff@gmail.com');
      });

      it('will re-hide the update button', () => {
        expect(form.exists('#update-user-email')).to.be.false;
      });

      it('will show a checkmark to let the user know the email was saved correctly', () => {
        expect(form.exists('#email-saved')).to.be.true;
      });
      it('will not have an error state', () => {
        const emailInput = form.find('#user-email').first();
        expect(emailInput.prop('error')).to.be.false;
      });
    });

    describe('if they enter an invalid email and hit enter', () => {
      beforeEach(() => {
        const emailInput = form.find('#user-email').first();
        expect(emailInput.prop('defaultValue')).to.equal('');

        emailInput.find('input').simulate('change', { target: { value: 'stuff@gmai' } });

        const emailForm = form.find('#user-email-form').first();
        emailForm.simulate('submit');
      });
      it('will show a helper message', () => {
        const emailInput = form.find('#user-email').first();
        expect(emailInput.prop('helperText')).to.equal('Please enter a valid email address');
      });
      it('will have an error state', () => {
        const emailInput = form.find('#user-email').first();
        expect(emailInput.prop('error')).to.be.true;
      });
      it('will not submit the form', () => {
        const storedValue = getEmailFromLocalStorage();
        expect(storedValue).to.equal('');
      });

      describe('if then fix the email address', () => {
        beforeEach(() => {
          const emailInput = form.find('#user-email').first();
          expect(emailInput.prop('defaultValue')).to.equal('');

          emailInput.find('input').simulate('change', { target: { value: 'stuff@gmail.com' } });
        });
        it('will not have an error state', () => {
          const emailInput = form.find('#user-email').first();
          expect(emailInput.prop('error')).to.be.false;
        });
      });
    });


    describe('update button', () => {
      it('will not be displayed on load', () => {
        expect(form.exists('#update-user-email')).to.be.false;
      });
      it('will display when the input changes and includes an `@` and a `.`', () => {
        const input = form.find('input#user-email').first();
        expect(input.prop('defaultValue')).to.equal('');

        input.find('input').simulate('change', { target: { value: 'anything@somewhere.com' } });

        expect(form.exists('#update-user-email')).to.be.true;
      });
      it('will not display if the input isn\'t an email address', () => {
        const input = form.find('input#user-email').first();
        expect(input.prop('defaultValue')).to.equal('');

        input.find('input').simulate('change', { target: { value: 'anythi' } });

        expect(form.exists('#update-user-email')).to.be.false;

        input.find('input').simulate('change', { target: { value: 'anything@som' } });

        expect(form.exists('#update-user-email')).to.be.false;
      });
      it('will not be visible when the settings are reset', () => {
        const input = form.find('#user-email').first();
        expect(input.prop('defaultValue')).to.equal('');

        input.find('input').simulate('change', { target: { value: 'anything@something.com' } });
        expect(form.exists('#update-user-email')).to.be.true;

        store.dispatch({ type: 'CLEAR_USER_PROFILE' });
        input.simulate('click'); // forcing a ui thing

        expect(form.exists('#update-user-email')).to.be.false;
      });
    });
  });
  describe('when there is a valid email address in local storage', () => {
    beforeEach(() => {
      window.localStorage.clear();
      window.localStorage.food_planner_userProfile = JSON.stringify({ userEmail: 'other@Email.com' });
      store = configureStore();
      form = mount(<Provider store={store}><EmailForm /></Provider>);
    });
    it('will be hidden if the input changes but the value is the same', () => {
      const input = form.find('#user-email').first();
      expect(input.prop('defaultValue')).to.equal('other@Email.com');

      input.find('input').simulate('change', { target: { value: 'stuff@things.blah' } });
      expect(form.exists('#update-user-email')).to.be.true;

      input.find('input').simulate('change', { target: { value: 'other@Email.com' } });
      expect(form.exists('#update-user-email')).to.be.false;
    });
    describe('when the settings are reset', () => {
      beforeEach(() => {
        store.dispatch({ type: 'CLEAR_USER_PROFILE' });
        const input = form.find('#user-email').first();
        input.simulate('click'); // forcing a ui thing
      });
      it('will still be hidden', () => {
        expect(form.exists('#update-user-email')).to.be.false;
      });
      it('will then be shown if I enter a new valid email', () => {
        const input = form.find('#user-email').first();
        input.find('input').simulate('change', { target: { value: 'stuff@things.blah' } });
        expect(form.exists('#update-user-email')).to.be.true;
      });
    });

  });
});
