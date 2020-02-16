/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import FoldersScreen from './screens/FoldersScreen';
import SongsScreen from './screens/SongsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AlbumsScreen from './screens/AlbumsScreen';
import {getPermissions} from './data/MusicDataProvider.js';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler'
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
const Tab = createMaterialTopTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colorLightBlack
  },
  
};

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
const Bottom = () => (
  <View style={{backgroundColor: 'red', height: 100, flex: 1}}>

  </View>
)

const SwipeNavigator = () => (
  <NavigationContainer theme={MyTheme}>
    <Tab.Navigator tabBarOptions={options}>
      <Tab.Screen  name="Albums" component={AlbumsScreen} />
      <Tab.Screen name="Folders" component={FoldersScreen} />
      <Tab.Screen name="Songs" component={SongsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>

  </NavigationContainer>
);

const App = () => {
  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colorBlack} />
      <Header />
      <View style={styles.screens}>
        <SwipeNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightBlack
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

// const TabNavigator = createMaterialTopTabNavigator(
//   {
//     Albums: {
//       screen: AlbumsScreen,
//       navigationOptions: {
//         tabBarLabel: 'Albums',
//       },
//     },

//     Folders: {
//       screen: FoldersScreen,
//       navigationOptions: {
//         tabBarLabel: 'Folders',
//       },
//     },

//     Songs: {
//       screen: SongsScreen,
//       navigationOptions: {
//         tabBarLabel: 'Songs',
//       },
//     },

//     Favorites: {
//       screen: FavoritesScreen,
//       navigationOptions: {
//         tabBarLabel: 'Favorites',
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: colorLightBlue,
//       inactiveTintColor: 'white',
//       upperCaseLabel: false,
//       style: {
//         backgroundColor: colorBlack,
//       },
//       indicatorStyle: {
//         backgroundColor: colorBlue,
//       },
//     },
//   },
// );

export default App;
