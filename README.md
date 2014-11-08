# Target

[![Made by unshift](https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square)](http://unshift.io)[![Version npm](http://img.shields.io/npm/v/target.svg?style=flat-square)](http://browsenpm.org/package/target)[![Build Status](http://img.shields.io/travis/unshiftio/target/master.svg?style=flat-square)](https://travis-ci.org/unshiftio/target)[![Dependencies](https://img.shields.io/david/unshiftio/target.svg?style=flat-square)](https://david-dm.org/unshiftio/target)[![Coverage Status](http://img.shields.io/coveralls/unshiftio/target/master.svg?style=flat-square)](https://coveralls.io/r/unshiftio/target?branch=master)[![IRC channel](http://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square)](http://webchat.freenode.net/?channels=unshift)

POST/GET/`<HTTP METHOD>` a resource through an iframe. So, why would need an
iframe? There are cases where you cannot use cross domain XHR because of the
browser support that is missing etc. or maybe you just want to upload a file
without triggering a full-page refresh. This module makes that all possible.

## Installation

The module is released through npm and tries to follow semver as closely as
possible. You can install the latest version of this module using:

```
npm install --save target
```

## Usage

In all examples we assume that the following code has been loaded.

```js
var target = require('target');
```

The `target` variable now contains a function. The returned function can be
called with 3 arguments, the _options_ argument is optional and can be omitted:

```js
target('http://your-target-url.here/please', function send(err) {
  // Error first completion callback.
});
```

As you can see in the example above, the first argument is the URL that should
receive the send data. And the last argument should **always** be a callback. It
follows an error first callback pattern as you might be used to in node.js. The
second argument is an optional object, this object allows you to fully configure
the module:

- `body`: String of data that should be posted to the server.
- `dom`: Document element we append to and create elements from.
- `param`: The name of the param where we send the data with.
- `method`: The HTTP method of the request.
- `class`: CSS class name which will be applied to the created form element.
- `uuid`: Unique id, will be used as submit target and id of the created iframe.

So to `POST` data to the server:

```js
target('http://localhost:8080/incoming', {
  method: 'POST',
  body: 'Hello mom'
}, function send(err) {
  console.log(arguments);
});
```

## License

MIT
