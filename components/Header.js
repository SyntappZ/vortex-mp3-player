import React, {useState, useEffect} from 'react';
import {PlayerContext} from '../player/PlayerFunctions';
import {clearAllStorage} from '../data/AsyncStorage.js';
import Menu, {MenuItem} from 'react-native-material-menu';
import RNFS from 'react-native-fs';
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

  
  // const makeDir = async () => {
  //   try {const AppFolder = 'albumArt/';
  //     const target = '/storage/emulated/0/' + AppFolder;
  //     const noMedia = target + '.nomedia'
  //     await RNFS.mkdir(target);
  //     await RNFS.writeFile(noMedia, '')
  //     return 'created';
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  // const moveImageToFolder = async (cover) => {
  //   try {
  //     if(cover) {
  //       const target = '/storage/emulated/0/albumArt/3733.jpg';
  //       await RNFS.moveFile(cover, target);
  //     }
  //     console.log('moved')
  //     return 'moved';
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };
  

  const wipeStorage = async () => {
    // moveImageToFolder('/storage/emulated/0/3733.jpg')
    const checkFolder = await RNFS.readDir('/storage/emulated/0/albumArt')
 const folderImageList = checkFolder.map(item => item.path)
 console.log(dat)
    // const message = await clearAllStorage()
    // console.log(message)
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
            <TouchableOpacity onPress={wipeStorage} style={styles.title}>
              <Text style={styles.titleText}>
                vortex <Text style={styles.blueText}>player</Text>
              </Text>
            </TouchableOpacity>
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
