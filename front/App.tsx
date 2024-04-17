import 'react-native-gesture-handler';
import 'react-native-screens';
import "expo-dev-client";
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { lightTheme, darkTheme } from './theme';

import Navigation from './navigation';


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
              <Navigation colorScheme={colorScheme} />       
           
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}