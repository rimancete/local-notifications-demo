import type { ConfigContext, ExpoConfig } from '@expo/config';

// import { ClientEnv, Env } from './env';
import { ClientEnv } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-base',
  // ... the rest config
  slug: 'expo-base',
  version: '1.0.0',
  orientation: 'default',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    // bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#fff',
    },
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: 'c6e047c2-b312-4d13-9415-4643c695430c',
    },
  },
  plugins: [
    [
      'expo-notifications',
      {
        icon: './local/assets/icon.png',
        color: '#ffffff',
      },
    ],
  ],
  // .. sentry config and other stuff here
});
