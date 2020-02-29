import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';

import Menu, {MenuItem} from 'react-native-material-menu';
import {PlayerContext} from '../player/PlayerFunctions';

import IonIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const colorBlack = '#0D0D0D';

class Track extends PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentTrackId: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  showMenu = () => this._menu.show();

  render() {
    const {artist, title, duration, trackId, getPlaylist} = this.props;

    const colorBlue = '#2A56B9';

    let icon = <Entypo name={'note'} size={30} color={colorBlue} />;
    return (
      <PlayerContext.Consumer>
        {({favorites, setFavorites}) => {
          const addToFavs = () => {
            const {trackId} = this.props;

            if (!favorites.includes(trackId)) {
              if (this._isMounted) {
                setFavorites([...favorites, trackId]);
                ToastAndroid.show('Added to favorites', ToastAndroid.SHORT);
              }
            }

            this._menu.hide();
          };

          return (
            <View style={styles.container}>
              <View style={styles.iconWrap}>{icon}</View>

              <View style={styles.textWrap}>
                <TouchableOpacity
                  style={styles.Touchable}
                  onPress={() => getPlaylist(trackId)}>
                  <Text numberOfLines={1} style={styles.title}>
                    {title}
                  </Text>
                  <Text numberOfLines={1} style={styles.author}>
                    {artist}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.showMenu} style={styles.moreWrap}>
                <View style={styles.timeWrap}>
                  <Text style={styles.trackTime}>{duration}</Text>

                  <Menu
                    style={{backgroundColor: colorBlack}}
                    button={
                      <IonIcon
                        style={styles.menu}
                        name="md-more"
                        size={30}
                        color="white"
                      />
                    }
                    ref={this.setMenuRef}>
                    <MenuItem textStyle={{color: 'white'}} onPress={addToFavs}>
                      add to favorites
                    </MenuItem>
                  </Menu>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      </PlayerContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    paddingRight: 15,
  },
  Touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textWrap: {
    flex: 4,
    justifyContent: 'center',
  },
  moreWrap: {
    flex: 2,
    justifyContent: 'center',
  },
  timeWrap: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  trackTime: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },

  author: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default Track;
