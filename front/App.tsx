import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { lightTheme, darkTheme } from './theme';

import Navigation from './navigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';

// Create a new stack navigator for the login screen
const LoginStack = createStackNavigator();
function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}

export default function App(): JSX.Element | null {
  const [isAuth, setIsAuth] = useState(false); // Set initial state to false
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
        <SafeAreaProvider>
        <NavigationContainer>
            {isAuth ? (
              <Navigation colorScheme={colorScheme} />
            ) : (
              <LoginNavigator />
            )}
          </NavigationContainer>
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}