import React, {useState} from 'react';
import {PlayerContext} from '../player/PlayerFunctions';
import Searchbar from './Searchbar';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Header = ({navigation}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const openMenu = () => {
    navigation.navigate('Settings');
  };
  const search = () => setOpenSearch(!openSearch);



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
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle={'fullScreen'}
        visible={openSearch}
        onRequestClose={() => {
          search();
        }}>
        <Searchbar closeSearch={search} />
      </Modal>
      <TouchableOpacity onPress={clearAll} style={styles.hamburger}>
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
      <TouchableOpacity style={styles.more}>
        <Icon color="white" name="md-more" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
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
  // tabBar: {
  //   backgroundColor: 'white',
  // },
});

export default Header;
