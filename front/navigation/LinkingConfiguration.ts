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
          Login: 'login',
          Scan: 'scan',
        },
      },
      NotFound: '*',
    },
  },
};