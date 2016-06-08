Meteor.startup(function () {

  if (GlobalAssets ) {

    var apnConfig,
      isProduction = (process.env.NODE_ENV === 'production');

    if (isProduction) {
      apnConfig = {
        certData: GlobalAssets.getText(GetMeteorSettingsValue('juto.push.apnProdCertAsset')),
        keyData: GlobalAssets.getText(GetMeteorSettingsValue('juto.push.apnProdKeyAsset')),
        //  passphrase: 'xxxxxxxxx',
        gateway: 'gateway.push.apple.com'
      }
    } else {
      apnConfig = {
        certData: GlobalAssets.getText(GetMeteorSettingsValue('juto.push.apnDevCertAsset')),
        keyData: GlobalAssets.getText(GetMeteorSettingsValue('juto.push.apnDevKeyAsset')),
        //  passphrase: 'xxxxxxxxx',
        gateway: 'gateway.sandbox.push.apple.com'
      }
    }
    apnConfig.production = isProduction;

    Push.debug = GetMeteorSettingsValue('juto.push.debug');
    Push.Configure({
      apn: apnConfig,
      gcm: {
        apiKey: GetMeteorSettingsValue('juto.push.gcmAPIKey')
      },
      production: isProduction,
      sound: GetMeteorSettingsValue('public.juto.pushclient.sound'),
      badge: GetMeteorSettingsValue('public.juto.pushclient.badge'),
      alert: GetMeteorSettingsValue('public.juto.pushclient.alert'),
      vibrate: GetMeteorSettingsValue('public.juto.pushclient.vibrate'),
      keepNotifications: GetMeteorSettingsValue('public.juto.pushclient.keepNotifications')
      // 'sendInterval': 15000, Configurable interval between sending
      // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    });
  } else {
    throw new Meteor.Error("GlobalAssets not found. Create a server file with:\nGlobalAssets = Assets;")
  }
});
