import jsdom from 'jsdom';
import matchMediaPolyfill from 'mq-polyfill';
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
global.navigator = {
	userAgent: 'node.js'
};
/**
 * Define the window.matchMedia
 */
matchMediaPolyfill(global.window);

/**
 * For dispatching resize event
 * we must implement window.resizeTo in jsdom
 */
window.resizeTo = function resizeTo(width, height) {
	Object.assign(this, {
		innerWidth: width,
		innerHeight: height,
		outerWidth: width,
		outerHeight: height,
	}).dispatchEvent(new this.Event('resize'));
};


