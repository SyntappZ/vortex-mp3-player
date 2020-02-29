import React, {Component} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FoldersScreen from '../screens/FoldersScreen';
import TracksScreen from '../screens/TracksScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AlbumsScreen from '../screens/AlbumsScreen';

import Header from '../components/Header';
import {StyleSheet, View, StatusBar} from 'react-native';

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const Tab = createMaterialTopTabNavigator();
export default class SwipeNavigator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      activeTintColor: colorLightBlue,
      inactiveTintColor: 'white',
      labelStyle: {
        textTransform: 'capitalize',
      },
      style: {
        backgroundColor: colorBlack,
      },
      indicatorStyle: {
        backgroundColor: colorBlue,
      },
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colorBlack} animated={true} />
        <Header navigation={this.props.navigation} />
        <View style={styles.screens}>
          <Tab.Navigator tabBarOptions={options}>
            <Tab.Screen name="Albums" component={AlbumsScreen} />
            <Tab.Screen name="Folders" component={FoldersScreen} />
            <Tab.Screen name="Songs" component={TracksScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
          </Tab.Navigator>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightBlack,
  },
  screens: {
    flex: 8,
  },
});
