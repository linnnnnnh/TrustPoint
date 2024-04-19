import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import "../global.css";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
    style={styles.logo}
    source={require('../assets/images/tp.jpg')}
/>
        <Text style={styles.title}>Welcome!! You are</Text>
      <Button
        title="Brand"
        onPress={() => navigation.navigate('BrandAuth')}
      />
      <Button
        title="Consumer"
        onPress={() => navigation.navigate('ConsumerAuth')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
    logo: {
        width: 200,
        height: 100,
        zIndex: 100,
        marginBottom: 20,
     
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});