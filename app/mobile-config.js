// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.walking-game',
  name: 'walking game',
  description: 'walking game is awesome',
  author: 'Interglobal Vision',
  email: 'contact@example.com',
  website: 'http://example.com',
});

App.accessRule('http://meteor.local/*');
App.accessRule('http://*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');

// Set up resources such as icons and launch screens.
/*
App.icons({
  'iphone': 'icons/icon-60.png',
  'iphone_2x': 'icons/icon-60@2x.png',
  // ... more screen sizes and platforms ...
});
*/

App.launchScreens({
  'iphone': 'mobile-assets/splash/Default-Portrait.png',
  'iphone_2x': 'mobile-assets/splash/Default@2x.png',
  'iphone5': 'mobile-assets/splash/Default-568h@2x.png',
  'iphone6': 'mobile-assets/splash/Default-667h@2x.png',
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');

// Pass preferences for a particular PhoneGap/Cordova plugin
/*
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/
