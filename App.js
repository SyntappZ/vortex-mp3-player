/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {MusicDataProvider} from './data/MusicDataProvider.js';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PlaceHolder = () => (
  <View style={styles.container}>
    <Text>hellllloooooooooooooooooo</Text>
  </View>
);

const SwipeNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="albums" component={PlaceHolder} />
      <Tab.Screen name="Folders" component={PlaceHolder} />
      <Tab.Screen name="Songs" component={PlaceHolder} />
      <Tab.Screen name="Favorites" component={PlaceHolder} />
    </Tab.Navigator>
  </NavigationContainer>
);

const App = () => {
  useEffect(() => {
    MusicDataProvider();
  }, []);

  return (
    <View style={styles.container}>
      <SwipeNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
