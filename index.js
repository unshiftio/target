'use strict';

var iframe = require('frames')
  , one = require('one-time')
  , id = 0;

/**
 * Request a target resource through an iframe.
 *
 * @param {String} url The URL we want to target.
 * @param {Object} options Configuration for transferring the data.
 * @param {Function} fn Completion callback, assumes error first.
 * @returns {Function} Abortion.
 * @api public
 */
module.exports = function target(url, options, fn) {
  if ('function' === typeof method) {
    fn = options;
    options = 0;
  }

  options = options || {};
  fn = one(fn);

  options.body = options.body || '';                // Optional post body.
  options.dom = options.dom || document;            // Document element to use.
  options.param = options.param || 'data';          // Name of the data parameter.
  options.method = options.method || 'GET';         // Method we use for the form.
  options.class = options.class || 'target-form';   // Custom className for form.
  options.uuid = options.uuid || 'target-'+ (id++); // Custom name attribute.

  var i = iframe(options.dom.body, options.uuid)
    , form = options.dom.createElement('form')
    , textarea;

  /**
   * Abort or cleanup the connection.
   *
   * @param {Error} err Optional error argument.
   * @api public
   */
  function abort(err) {
    if (!i) return; /* Abort is already called */

    i.remove();
    options.dom.body.removeChild(form);
    form = i = textarea = options = undefined;

    fn(err || new Error('Request aborted by developer.'));
  }

  /**
   * Completion callback. We call the abort method after the execution of the
   * supplied callback or we will call the function with an error argument.
   *
   * @api private
   */
  function complete() {
    fn(); abort();
  }

  form.style.cssText = 'position:absolute;top:-1000px;left:-1000px';
  form.setAttribute('accept-charset', 'utf-8');
  form.className = options.class;
  form.method = options.method;
  form.target = options.uuid;
  form.action = url;

  if (options.body) {
    textarea = options.dom.createElement('textarea');
    textarea.value = options.body;
    textarea.name = options.param;
    form.appendChild(textarea);
  }

  try { form.submit(); }
  catch (e) { return abort(new Error('Failed to send data: '+ e.message)); }

  if (!i.frame.attachEvent) i.frame.onload = complete;
  else i.frame.onreadystatechange = function change() {
    if (i || i.frame) return;
    if ('complete' === i.frame.readyState) return complete();
  };

  return abort;
};
