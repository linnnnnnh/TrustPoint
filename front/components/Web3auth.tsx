import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Web3Auth = ({ onConnect }) => {
  const handleConnect = () => {
    // Add your web3 connection logic here
    onConnect();
  };

  return (
    <TouchableOpacity onPress={handleConnect}>
      <Image
        style={styles.icon}
        source={require('../assets/images/icons/walletconnectW.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
  },
});

export default Web3Auth;