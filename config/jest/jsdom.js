const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const window = new JSDOM(
  `<!doctype html><html><body><div id='root'></div></body></html>`
).window;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};

global.requestAnimationFrame = function(cb) {
  return setTimeout(cb, 0);
};