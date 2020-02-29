import React, {Component} from 'react';
import {View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import ModalScreen from '../popupScreens/ModalScreen';
import Search from '../popupScreens/Searchbar';
import SwipeNavigator from './SwipeNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Splash from '../splash/Splash';
import Settings from '../popupScreens/Settings';
import PlaylistConsumer from '../player/PlaylistConsumer';
const Initial = createStackNavigator();
const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';

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
          <Initial.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
          <Initial.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: true,
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: colorBlack,
              },
            }}
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
      </Stack.Navigator>
      <PlaylistConsumer />
    </View>
  );
};
