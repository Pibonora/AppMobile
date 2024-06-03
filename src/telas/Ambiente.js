// Ambiente.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Ambiente = () => {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao Ambiente</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Ambiente;
