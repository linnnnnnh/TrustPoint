import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Wallet: 'wallet',
          Debug: 'debug',
        },
      },
      NotFound: '*',
    },
  },
};