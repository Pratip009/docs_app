import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
    <ActivityIndicator />
  </View>
);

export default SplashScreen;