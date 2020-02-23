import React, {useEffect, useState} from 'react';
import {View, Keyboard, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import ModalScreen from '../popupScreens/ModalScreen';

import SwipeNavigator from './SwipeNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import PlaylistConsumer from '../player/PlaylistConsumer';

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';
const darkBlue = '#062D83';

const Menu = () => {
  return (
    <View style={{flex: 1}}>
      <Text>this is a menu</Text>
    </View>
  );
};


const NavContainer = () => {
  const MyTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: colorLightBlack,
    },
  };
  // const menu = <Menu navigator={navigator} />;
  const Stack = createStackNavigator();


  return (
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
        <Stack.Screen
          name="Settings"
          component={Menu}
          options={{
            headerShown: false,
            cardOverlayEnabled: true,
            gestureEnabled: true,
            gestureResponseDistance: {
              vertical: 400,
            },
          }}
        />
      </Stack.Navigator>
      <PlaylistConsumer />


    </NavigationContainer>
  );
};

export default NavContainer;
