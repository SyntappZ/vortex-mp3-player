import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FoldersScreen from '../screens/FoldersScreen';
import TracksScreen from '../screens/TracksScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AlbumsScreen from '../screens/AlbumsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {askPermissions} from '../data/MusicDataProvider.js';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';


const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';


const Header = () => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error(e);
    }

    console.log('strorage cleared.');
  };
  return (
    <View style={styles.header}>
      <View style={styles.menu}>
        <Icon color="white" name="md-menu" size={30} />
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.title}>
            vortex <Text style={styles.blueText}>player</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.more}>
        <Icon color="white" name="md-search" size={30} />

        <Icon color="white" name="md-more" size={30} />
      </View>
    </View>
  );
};
const Tab = createMaterialTopTabNavigator();
export default class SwipeNavigator extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
   
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
        <StatusBar backgroundColor={colorBlack} />
        <Header />
        <View style={styles.screens}>
          <Tab.Navigator tabBarOptions={options}>
            <Tab.Screen name="Albums" component={AlbumsScreen} jeff={'hello im jeffffffffffff'} />
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
  title: {
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 20,
    paddingLeft: 30,
    fontStyle: 'italic',
  },
  blueText: {
    color: colorLightBlue,
    fontWeight: '100',
  },
  tabBar: {
    backgroundColor: 'white',
  },

  header: {
    backgroundColor: colorBlack,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  menu: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  screens: {
    flex: 4,
  },
  more: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});