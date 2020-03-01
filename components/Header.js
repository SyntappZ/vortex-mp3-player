import React, {useState, useEffect} from 'react';
import {PlayerContext} from '../player/PlayerFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import Menu, {MenuItem} from 'react-native-material-menu';

import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  const [isSearching, setSearching] = useState(false);

  const openMenu = () => {
    navigation.navigate('Settings');
  };
  const search = () => {
    navigation.navigate('Search');
  };

  return (
    <PlayerContext.Consumer>
      {({refresher}) => {
        let menu = null;
        const setMenuRef = ref => (menu = ref);

        const showMenu = () => menu.show();

        const rescan = () => {
          setSearching(true);
          refresher().then(() => {
            ToastAndroid.show('Scan Complete!', ToastAndroid.SHORT);
            setSearching(false);
          });

          menu.hide();
        };

        return (
          <View style={styles.header}>
            <TouchableOpacity onPress={openMenu} style={styles.hamburger}>
              <Icon color="white" name="md-menu" size={30} />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}>
                vortex <Text style={styles.blueText}>player</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={search} style={styles.search}>
              <Icon color="white" name="md-search" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={isSearching ? null : showMenu}
              style={styles.more}>
              {isSearching ? (
                <ActivityIndicator size="small" color="#aaa" />
              ) : (
                <Menu
                  style={{backgroundColor: colorBlack}}
                  button={<Icon color="white" name="md-more" size={30} />}
                  ref={setMenuRef}>
                  <MenuItem textStyle={{color: 'white'}} onPress={rescan}>
                    rescan files
                  </MenuItem>
                </Menu>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    </PlayerContext.Consumer>
  );
};

const colorBlack = '#0D0D0D';
const colorLightBlue = '#0B64D9';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colorBlack,
    flex: 1,
    flexDirection: 'row',
  },
  hamburger: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  more: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 20,
    fontStyle: 'italic',
  },
  blueText: {
    color: colorLightBlue,
    fontWeight: '100',
  },
});

export default Header;
