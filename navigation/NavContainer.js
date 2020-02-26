import React, {Component, useEffect, useState} from 'react';
import {View, Keyboard, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import ModalScreen from '../popupScreens/ModalScreen';

import SwipeNavigator from './SwipeNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Splash from '../splash/Splash';
import PlaylistConsumer from '../player/PlaylistConsumer';
const Initial = createStackNavigator();
const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';
const darkBlue = '#062D83';


class NavContainer extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        <Initial.Navigator initialRouteName="Splash">
          <Initial.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Initial.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
        </Initial.Navigator>
      </NavigationContainer>
    );
  }
}

export default NavContainer;

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colorLightBlack,
  },
};


const Menu = () => {
  return (
    <View style={{flex: 1}}>
      <Text>this is a menu</Text>
    </View>
  );
};
const Stack = createStackNavigator();
const Main = () => {
  return (
    <View style={{flex: 1}}>
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
    </View>
  );
};
