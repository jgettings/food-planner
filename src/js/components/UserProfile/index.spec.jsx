import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SettingsIcon from '@material-ui/icons/Settings';
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
  let button;
  before(() => {
    bar = mount(<AppBar />);
    button = bar.find('#user-settings button').first();
  });
  after(() => {
    bar.unmount();
  });

  describe('When not logged in', () => {
    it('Will show a settings gear icon in the topbar', () => {
      expect(button.length).to.not.equal(0);
      expectIconToBeInElement(<SettingsIcon />, button);
    });
  });

  xdescribe('When we have a gravatar login');

  describe('Settings Dialog', () => {
    let dialog;
    beforeEach(() => {
      dialog = document.getElementById('user-settings-dialog');
    });
    it('will not be open on load', () => {
      expect(dialog.style.visibility).to.equal('hidden');
    });
    it('will open when the user avatar is clicked', () => {
      button.simulate('click');

      expect(dialog.style.visibility).to.not.equal('hidden');
    });
    xit('will close when the close button is clicked', () => {
      expect(dialog.style.visibility).to.equal('hidden');
      button.simulate('click');
      expect(dialog.style.visibility).to.not.equal('hidden');

      // click the close button
      // dialog.find('.close-button')
      // const closeButton = bar.find('.close-button');
      // closeButton.forEach((cb) => {
      //   // console.log(cb.html());
      //   cb.simulate('click'); // there are 5. This doesn't close it anyways.
      // });
      // closeButton.simulate('click'); // this isn't actually doing a click
      // closeButton isn't the right element? maybe?

      const closeButton = dialog.querySelectorAll('.close-button')[0];
      // console.log(closeButton);
      // closeButton.click();
      console.log(window.Event);

      const clickEvent = new window.Event('click', { bubbles: true, cancelable: false, composed: false });
      closeButton.dispatchEvent(clickEvent);

      const nowDialog = document.getElementById('user-settings-dialog');

      expect(nowDialog.style.visibility).to.equal('hidden');
    });
  });
});
