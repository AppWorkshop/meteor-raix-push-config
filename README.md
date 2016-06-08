# Push Notifications

(Based on the readmes at [raix:push](https://github.com/raix/push/blob/fix-device-dependency-deprecate-json-format/README.md))

'Quick' config of raix:push for android and iOS. This package sets up some sensible server and client code, and allows
you to configure it using (overrideable) ```settings.json```.

It also automatically selects your development or production pem/certs based on the NODE_ENV environment setting.

### Instructions

1. Ensure you have [fastlane tools] installed.

   [fastlane tools]:https://github.com/fastlane/fastlane


2. Add this package to the app

    ```
    meteor add appworkshop:raix-push-config
    ```    

2. Get the Google API key and project number as per [raix:push android docs]

[raix:push android docs]:https://github.com/raix/push/blob/fix-device-dependency-deprecate-json-format/docs/ANDROID.md


3. Update the ```mobile-config.json``` file in the meteor project. Particularly, make sure it has the correct:

    * App ID
    * Put this down the bottom:

        ```
        App.configurePlugin('phonegap-plugin-push', {
          SENDER_ID : 'GOOGLE_CLOUD_SENDER_ID_GOES_HERE'
        });
        ```
    
    * Make sure you replace the ```GOOGLE_CLOUD_SENDER_ID_GOES_HERE``` with the project number.
    
4. In the ```/private``` folder of your meteor app:

    ```
    pem -a com.example.myappid
    ```
    
    Substitute the appropriate app id.
    
    Sample output:
    
    ```
    $ pem -a com.example.myappid 
    
    +------------------+------------------------------------+
    |                 Summary for PEM 1.3.1                 |
    +------------------+------------------------------------+
    | app_identifier   | com.example.myappid |
    | development      | false                              |
    | generate_p12     | true                               |
    | force            | false                              |
    | save_private_key | true                               |
    | output_path      | .                                  |
    +------------------+------------------------------------+
    
    [20:41:22]: To not be asked about this value, you can specify it using 'username'
    Your Apple ID Username: myappleid@example.com
    [20:41:28]: Starting login with user 'myappleid@example.com'
    Multiple teams found on the Developer Portal, please enter the number of the team you want to use: 
    1) 123456789 "The App Workshop Pty Ltd" (Company/Organization)
    2) 987654321 "Another Organization" (Company/Organization)
    1
    [20:42:37]: Successfully logged in
    [20:42:39]: Creating a new push certificate for app 'com.example.myappid'.
    [20:42:42]: Private key: /Users/mikecunneen/Documents/Development/my-meteor-project/meteor-server/private/production_com.example.myappid.pkey
    [20:42:42]: p12 certificate: /Users/mikecunneen/Documents/Development/my-meteor-project/meteor-server/private/production_com.example.myappid.p12
    [20:42:42]: PEM: /Users/mikecunneen/Documents/Development/my-meteor-project/meteor-server/private/production_com.example.myappid.pem

    ```
        
    * SAVE THESE FILES SOMEWHERE SAFE. 
    * Make a note of the filenames
    

    
5. Do similarly to generate the development keys:

    ```
    pem --development -a com.example.myappid 
    ```
    
    * SAVE THESE FILES SOMEWHERE SAFE.
    * Make a note of the filenames
 
   
6. In settings.json, add the following config:

    ```
    {
      "public": {
        ...
        "juto": {
          ...
          "pushclient":{
            "debug":true,
            "gcmProjectNumber":"0123456789",
            "sound": true,
            "badge": true,
            "alert": true,
            "vibrate": true,
            "keepNotifications": true,
            "clearNotifications": true
          }
          ...
        },
        ...
      },
      "juto":{
        ...
        "push": {
          "gcmAPIKey":"AbCdEfGhIjK-AbCdEfGhIjK",
          "debug":true,
          "apnDevKeyAsset":"development_com.example.myappid.pkey",
          "apnDevCertAsset":"development_com.example.myappid.pem",
          "apnProdKeyAsset":"production_com.example.myappid.pkey",
          "apnProdCertAsset":"production_com.example.myappid.pem",
          "denyFromClient":true,
          "allowMethods":false
        }
        ...
      }
    }
    ```
  
7. Create a file in ```server/global-assets.js``` :

    ```
    // allows packages to access app-level Assets
    GlobalAssets = Assets;

    ```
    
8. Go back to the google credentials page, and add your server's IP address.