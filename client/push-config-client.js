Meteor.startup(function () {
  Push.debug = GetMeteorSettingsValue('public.juto.pushclient.debug');
  Push.Configure({
    android: {
      senderID: GetMeteorSettingsValue("public.juto.pushclient.gcmProjectNumber"),
      sound: GetMeteorSettingsValue('public.juto.pushclient.sound'),
      badge: GetMeteorSettingsValue('public.juto.pushclient.badge'),
      alert: GetMeteorSettingsValue('public.juto.pushclient.alert'),
      vibrate: GetMeteorSettingsValue('public.juto.pushclient.vibrate'),
      clearNotifications: GetMeteorSettingsValue('public.juto.pushclient.clearNotifications'),
      clearBadge: GetMeteorSettingsValue('public.juto.pushclient.clearBadge'),
      forceShow: GetMeteorSettingsValue('public.juto.pushclient.forceShow')

      // icon: '',
      // iconColor: ''
    },
    ios: {
      sound: GetMeteorSettingsValue('public.juto.pushclient.sound'),
      badge: GetMeteorSettingsValue('public.juto.pushclient.badge'),
      alert: GetMeteorSettingsValue('public.juto.pushclient.alert'),
      clearBadge: GetMeteorSettingsValue('public.juto.pushclient.clearBadge')
    }
  });
});
