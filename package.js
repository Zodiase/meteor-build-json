Package.describe({
  name: 'zodiase:build-json',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Build json files into js files so packages can add them.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Zodiase/meteor-build-json.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compileJsonBatch",
  use: ['caching-compiler@1.1.9', 'ecmascript@0.6.3'],
  sources: [
    'plugin/compile-json.js'
  ]
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
});
