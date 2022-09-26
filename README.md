# Ecommerce
Ecommerce (Hybrid App) using React Native &amp; Redux
## Getting Started

### Recommended Development Environment

Run `npx envinfo` and compare your environment against these recommended settings, updating as needed.

```
Environment:
  OS: macOS Monterey 12.5.1
  Node: 16.15.0
  Yarn: 1.22.19
  npm: 8.8.0
  Xcode: Xcode 13.4.1
  Android Studio: Dolphin 2021.3.1
```

1. Fork and clone the repo
2.  cd `ecommerce`
3. `git remote add upstream  git@github.com:heiisenberrg/ecommerce.git`
4. `git fetch upstream`
5. `yarn clean`
7. Run the app using your local config `yarn run ios` or `yarn run android`

### Linking Libraries

Native libraries are linked automatically when installed via yarn.

## Updating to New Releases

See the [React Native Helper Tool guide](https://react-native-community.github.io/upgrade-helper/) for upgrading React Native version.

While upgrading RN it is implicit to upgrade other dependency package to make it compatible for newer version of react-native.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well.

### `yarn start`

Runs your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start --reset-cache
```

#### `yarn run ios`

Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.If you face any error (in Latest Xcode version) try running the above command with the flag `--simulator="iPhone 14 Pro Max"`

#### `yarn run android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).




