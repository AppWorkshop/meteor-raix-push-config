Meteor.startup(function () {
// Allow NO users to send from the client
  Push.deny({
    send: function (userId, notification) {
      return GetMeteorSettingsValue("juto.push.denyFromClient");
    }
  });

  Meteor.methods({
    serverNotification: function (title, text) {
      if (GetMeteorSettingsValue("juto.push.allowMethods")) {
        var badge = 1;

        // Only an admin can send a broadcast server wide push notification
        if (Roles.userIsInRole(this.userId, ["admin"])) {
          Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'default',
            payload: {
              title: title,
              text: text
              //historyId:
            },
            query: {
              // this will send to all users
            }
          });
        } else {
          throw new Meteor.Error(404, "Access denied. Administrative use only.");
        }
      }
    },
    userNotification: function (title, text, userId) {
      if (GetMeteorSettingsValue("juto.push.allowMethods")) {
        var badge = 1;

        // check there is a userId
        if (userId === "" || userId === undefined || userId === "undefined") {
          throw new Meteor.Error(404, "No userId was set, userId was " + userId);
        }

        if (this.userId) {
          Push.debug = true; // Add verbosity
          Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'default',
            payload: {
              title: title
              //historyId:
            },
            query: {
              userId: userId //this will send to a specific Meteor.user()._id
            }
          });
          console.log("USERID ON PUSH: " + userId);
        } else {
          throw new Meteor.Error(404, "You must be signed in to call this method");
        }
      }
    }
  });
});