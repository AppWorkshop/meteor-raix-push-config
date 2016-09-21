Package.describe({
  name: 'appworkshop:raix-push-config',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Configure raix:push with sensible defaults for both client and server',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/AppWorkshop/meteor-raix-push-config',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use([
    'standard-app-packages', 
    "appworkshop:settings-override-with-db@1.0.5",
    "appworkshop:push@3.0.3-rc.8",
    "alanning:roles@1.2.15"
  ], ['client', 'server']);
  api.imply([
    'appworkshop:push@3.0.3-rc.8',
    'alanning:roles'
  ],['client','server']); // let other packages use Push.

  var path = Npm.require('path');
  api.addFiles(path.join('client', 'push-config-client.js'), ['client']);
  api.addFiles([
    path.join('server', 'push-config-server.js'),
    path.join('server', 'push-methods.js')
  ],['server']);
});
