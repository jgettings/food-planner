/* eslint-disable import/no-extraneous-dependencies */

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.window = new JSDOM('', { url: 'http://localhost' }).window;
global.document = global.window.document;
global.HTMLInputElement = window.HTMLInputElement;

Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};


// function storageMock() {
//   const storage = {};

//   return {
//     setItem: (key, value) => {
//       storage[key] = value || '';
//     },
//     getItem: (key) => (key in storage ? storage[key] : null),
//     removeItem: (key) => {
//       delete storage[key];
//     },
//     get length() {
//       return Object.keys(storage).length;
//     },
//     key: (i) => {
//       const keys = Object.keys(storage);
//       return keys[i] || null;
//     },
//   };
// }
// global.localStorage = storageMock();
// global.sessionStorage = storageMock();

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
