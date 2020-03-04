/* eslint-disable import/no-extraneous-dependencies */

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.window = new JSDOM('', { url: 'http://localhost' }).window;
global.document = global.window.document;
global.HTMLInputElement = window.HTMLInputElement;
global.Image = window.Image;

Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
