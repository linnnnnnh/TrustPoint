import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Rewards: 'rewards',          
          ConsumerLoginScreen: 'ConsumerLoginScreen',
          Scan: 'scan',
        },
      },
      NotFound: '*',
    },
  },
};