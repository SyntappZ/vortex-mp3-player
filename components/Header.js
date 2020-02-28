import React, {useState} from 'react';
import {PlayerContext} from '../player/PlayerFunctions';
import Searchbar from './Searchbar';
import AsyncStorage from '@react-native-community/async-storage';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';


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
  const search = () => {
    navigation.navigate('Search');
  } 



  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error(e);
    }

    console.log('strorage cleared.');
  };
  return (
    <PlayerContext.Consumer>
      {({refresher}) => {

       

        
  let menu = null;

  const setMenuRef = ref => (menu = ref);

  const showMenu = () => menu.show();

  const rescan = () => {
    refresher()
    console.log('scanning...')
    menu.hide();
  }

        return (
          <View style={styles.header}>
     
          <TouchableOpacity onPress={openMenu} style={styles.hamburger}>
            <Icon color="white" name="md-menu" size={30} />
            
          
          </TouchableOpacity>
          <View style={styles.title}>
            <TouchableOpacity onPress={clearAll}>
            <Text style={styles.titleText}>
              vortex <Text style={styles.blueText}>player</Text>
            </Text>
            </TouchableOpacity>
           
          </View>
          <TouchableOpacity onPress={search} style={styles.search}>
            <Icon color="white" name="md-search" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showMenu} style={styles.more}>
          <Menu
              style={{backgroundColor: colorBlack}}
              button={
                <Icon color="white" name="md-more" size={30} />
              }
              ref={setMenuRef}>
              <MenuItem
                textStyle={{color: 'white'}}
                onPress={rescan}>
                rescan files
              </MenuItem>
            </Menu>
            
          </TouchableOpacity>
        </View>
        );
      }}
    </PlayerContext.Consumer>
   
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
