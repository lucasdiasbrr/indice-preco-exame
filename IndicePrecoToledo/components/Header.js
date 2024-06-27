import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-toledo.png')} 
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300, 
    height: 100, 
    resizeMode: 'contain', 
  },
});

export default Header;
