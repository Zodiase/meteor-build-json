# Meteor JSON Builder.

[![Greenkeeper badge](https://badges.greenkeeper.io/Zodiase/meteor-build-json.svg)](https://greenkeeper.io/)

This package builds JSON files into JavaScript files so packages can `addFiles` them.

## Usage

**Requires Meteor release 1.3+.**

```JavaScript
// package.js
Package.onUse(function(api) {
  api.use("modules");
  api.use('zodiase:build-json@1.1.0');

  api.addFiles('config.json', 'client');
  api.mainModule('client.js', 'client');
});
```

```JavaScript
// client.js
import config from './config.json';
```

## The problem

Take a look at this example of a Meteor package:

```JavaScript
// package.js
Package.onUse(function(api) {
  api.use("modules");
  api.mainModule("client.js", "client");
});
```

According to [the official documentation](https://docs.meteor.com/packages/modules.html#Modular-package-structure), `client.js` now:

> can import other files from the package source directory, even if those files have not been added using the `api.addFiles` function.

But that's not true if `client.js` looks like:

```JavaScript
// client.js
import config from './config.json';
```

No. Meteor iso-build doesn't seem to include JSON file imports. As I'm getting `Cannot find module './config.json'` errors all over the place.
