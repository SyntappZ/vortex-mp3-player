import React, {useState} from 'react';
import {PlayerContext} from '../player/PlayerFunctions';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Search from 'react-native-search-box';

const Header = ({navigation}) => {
  const [isSearching, setSearching] = useState(false);
  const openMenu = () => {
    navigation.navigate('Settings');
  };
  // const search = () => {
  //   setSearching(!isSearching);
  //   navigation.navigate('Songs');

  // };
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
      {({openSearch}) => {
        const search = () => {
          openSearch(isSearching);
          navigation.navigate('Songs');
          setSearching(!isSearching)
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
              {isSearching ? (
                <Entypo color="white" name="squared-cross" size={30} />
              ) : (
                <Icon color="white" name="md-search" size={30} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.more}>
              <Icon color="white" name="md-more" size={30} />
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
