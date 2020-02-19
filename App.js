/**
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import ModalScreen from './popupScreens/ModalScreen';
import PlayerFunctions from './player/PlayerFunctions';
import PlaylistConsumer from './player/PlaylistConsumer';
import SwipeNavigator from './navigation/SwipeNavigator';
import {askPermissions} from './data/MusicDataProvider.js';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colorLightBlack,
  },
};

const App = () => {
  useEffect(() => {}, []);

  return (
    <PlayerFunctions>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator mode="modal" initialRouteName="MainScreen">
          <Stack.Screen
            name="MainScreen"
            component={SwipeNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <PlaylistConsumer />
    </PlayerFunctions>
  );
};

export default App;
