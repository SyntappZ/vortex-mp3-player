import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Gradient from '../components/Gradient';
import TextTicker from 'react-native-text-ticker';
import TrackPlayer from 'react-native-track-player/index';
import Menu, {MenuItem} from 'react-native-material-menu';

import ProgressSlider from '../components/ProgressSlider';
import TimeInterval from '../components/TimeInterval';
import Sheet from './Sheet';

const darkBlue = '#062D83';
const colorBlack = '#0D0D0D';
const NowPlayingBig = ({
  modalHandler,
  trackTitle,
  trackArt,
  trackArtist,
  playerControls,
  duration,
  isShuffled,
  trackId,
  shuffleUpComingPlaylist,
  setFavorites,
  favorites,
  seconds,
  isRepeat,
  setRepeat,
}) => {
  let isMounted = false;
  const playerState = TrackPlayer.usePlaybackState();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const shuffleToggle = () => {
    shuffleUpComingPlaylist(!isShuffled);
  };

  useEffect(() => {
    isMounted = true;
    if (isMounted) {
      setIsFavorite(favorites.includes(trackId));
    }
    return () => (isMounted = false);
  }, [favorites, trackId]);

  const storeFavorite = () => {
    if (isFavorite) {
      const removeId = favorites.filter(id => id !== trackId);

      setFavorites(removeId);
    } else {
      setFavorites([...favorites, trackId]);
    }
    ToastAndroid.show(
      `${isFavorite ? 'removed from' : 'added to'} favorites`,
      ToastAndroid.SHORT,
    );
  };

  let menu = null;

  const setMenuRef = ref => (menu = ref);

  const showMenu = () => menu.show();

  const repeat = () => {
    setRepeat(!isRepeat);

    menu.hide();
  };


  const isPlaying = playerState === TrackPlayer.STATE_PLAYING;
  let image;

  trackArt
    ? (image = (
        <Image
          source={{uri: trackArt}}
          style={{
            flex: 1,
            resizeMode: 'cover',
            width: '100%',
          }}
        />
      ))
    : (image = <Icon5 name={'headphones-alt'} size={120} color={'white'} />);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={darkBlue} animated={true} />

      <Gradient />

      <View style={styles.topbar}>
        <TouchableOpacity onPress={showMenu} style={styles.menu}>
          <Menu
            style={{backgroundColor: colorBlack}}
            ref={setMenuRef}
            button={
              <SimpleLineIcon
                style={styles.menuIcon}
                name={'options'}
                size={20}
                color="#fff"
              />
            }>
            <MenuItem textStyle={{color: 'white'}} onPress={repeat}>
              repeat {isRepeat ? 'off' : 'on'}
            </MenuItem>
          </Menu>
        </TouchableOpacity>
        <View style={styles.nowPlaying}>
          <Text style={styles.titleText}>Now Playing</Text>
        </View>
        <TouchableOpacity
          onPress={() => modalHandler()}
          style={styles.backButton}>
          <SimpleLineIcon
            style={styles.backIcon}
            name={'arrow-down'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageSection}>
        <View style={styles.imageWrap}>{image}</View>
      </View>

      <View style={styles.shuffleSection}>
        <TouchableOpacity onPress={shuffleToggle} style={styles.shuffle}>
          <SimpleLineIcon
            style={styles.shuffleIcon}
            name="shuffle"
            size={20}
            color={isShuffled ? '#fff' : '#555'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={storeFavorite} style={styles.favorite}>
          {isFavorite ? (
            <Icon
              style={styles.heartIcon}
              name="heart"
              size={25}
              color={'white'}
            />
          ) : (
            <Icon
              style={styles.heartIcon}
              name="heart-o"
              size={25}
              color={'white'}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSheetOpen(!isSheetOpen)}
          style={styles.playlist}>
          <SimpleLineIcon
            style={styles.playlistIcon}
            name="playlist"
            size={20}
            color={'#555'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <ProgressSlider seconds={seconds} duration={duration} />

        <View style={styles.timeSection}>
          <TimeInterval />
          <View style={styles.artistWrap}>
            <TextTicker
              style={styles.song}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {trackTitle}
            </TextTicker>

            <Text numberOfLines={1} style={styles.artist}>
              {trackArtist}
            </Text>
          </View>
          <View style={styles.endTime}>
            <Text style={styles.time}>{duration ? duration : '0:00'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.controlsSection}>
        <TouchableOpacity
          style={styles.backwards}
          onPress={() => playerControls('backwards')}>
          <IonIcon
            style={styles.backwardsIcon}
            name={'md-skip-backward'}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.play}
          onPress={() => playerControls(isPlaying ? 'pause' : 'play')}>
          <View
            style={[
              styles.circle,
              isPlaying ? {paddingLeft: 0} : {paddingLeft: 5},
            ]}>
            <IonIcon
              style={styles.playIcon}
              name={isPlaying ? 'md-pause' : 'md-play'}
              size={30}
              color="#fff"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forwards}
          onPress={() => playerControls('forwards')}>
          <IonIcon
            style={styles.forwardsIcon}
            name={'md-skip-forward'}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <Sheet favorites={favorites} isSheetOpen={isSheetOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  topbar: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    zIndex: 3,
  },

  menu: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  nowPlaying: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'white',
  },
  imageSection: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 3,
    position: 'relative',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 220,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden',
  },

  progressSection: {
    flex: 1,
    paddingHorizontal: 20,
  },

  shuffleSection: {
    zIndex: 3,
    position: 'relative',
    flex: 1.5,
    flexDirection: 'row',
  },

  shuffle: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playlist: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favorite: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeSection: {
    paddingTop: 10,
    flexDirection: 'row',
  },

  artistWrap: {
    flex: 4,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  song: {
    textTransform: 'capitalize',
    fontSize: 20,
    color: 'white',
  },

  artist: {
    textTransform: 'capitalize',
    color: '#aaa',
  },

  time: {
    color: '#777',
  },

  controlsSection: {
    flex: 2.5,
    flexDirection: 'row',
    paddingHorizontal: 50,
  },

  forwards: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backwards: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },

  play: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: darkBlue,
  },
});

export default NowPlayingBig;
