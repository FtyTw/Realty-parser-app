# Realty-parser-app

The React-native application created to collaborate with [Parser-server](https://github.com/FtyTw/Parser-server) app.
Supports both iOS and Android platform. Currently used only at Android.

## Install dependencies

After cloning the project run :

`npm install`

## OneSignal

To get and handle push notifications from your OneSignal project

you have to create tokens.json file at the root directory of your project

File have to contain specific content, example

`{"OSAppId":${YOUR-ONESIGNAL-APP-ID}}`

App id can be found within settings page of your OneSignal project.

https://app.onesignal.com/apps/${YOUR-ONESIGNAL-APP-ID}/settings/keys_and_ids page

# Development

To run project in develop mode chose the OS that will be used for development.
Then run a command:
`npm run ios` or `npm run android` dependent on the OS that you preferred at the moment.

# Release

To prepare release apk file for Android run:
`npm run release`
command will perform a build and will open directory with prepared .apk file.

To prepare release for iOS use xCode.
