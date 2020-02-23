import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {getAsyncStorage, setAsyncStorage} from '../data/AsyncStorage.js';

import IonIcon from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';
import NowPlayingBig from '../popupScreens/NowPlayingBig';

import TextTicker from 'react-native-text-ticker';
import TrackPlayer from 'react-native-track-player';

const NowPlaying = ({
  isShuffled,
  shuffleUpComingPlaylist,
  favorites,
  setFavorites,
 
}) => {
  const playerState = TrackPlayer.usePlaybackState();
  let isMounted = false;
  const [modalOpen, setModalOpen] = useState(false);
  const [trackTitle, setTrackTitle] = useState([]);
  const [trackArt, setTrackArt] = useState('');
  const [trackArtist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [seconds, setSeconds] = useState('')
  const [afterFirstLoad, setIsFirstLoad] = useState(false);

  const [albumPlaying, setAlbumPlaying] = useState('');
  const modalHandler = () => setModalOpen(!modalOpen);
  // const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [trackId, setId] = useState('');

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  // const storeTrack = async () => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();

  //   setAsyncStorage('track', currentTrack);
  // };

  useEffect(() => {
    isMounted = true;
    if(isMounted) {
      setIsFirstLoad(true);
     
    }

   

    let onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        try {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          
          if (isMounted) {
            setTrackArt('');
            setTrackTitle(track.title);
            setTrackArt(track.artwork);
            setArtist(track.artist);
            setDuration(track.duration);
            setId(track.id);
            setSeconds(track.seconds)
          }
        } catch (error) {
          console.log(error);
        }
       
        return () => {
          isMounted = false;
          
          onTrackChange.remove();
       
        };
      },
    );
  }, []);

  const playerControls = control => {
    switch (control) {
      case 'play':
        TrackPlayer.play();
        break;
      case 'pause':
        TrackPlayer.pause();
        break;
      case 'stop':
        TrackPlayer.stop();
        break;
      case 'reset':
        TrackPlayer.reset();
        break;
      case 'forwards':
        TrackPlayer.skipToNext();
        break;
      case 'backwards':
        TrackPlayer.skipToPrevious();
    }
  };

  const image = <Image style={styles.image} source={{uri: trackArt}} />;
  const colorBlue = '#2A56B9';

  const defaultImage = <IonIcon name="md-disc" size={60} color="#666" />;

  const isPlaying = playerState === TrackPlayer.STATE_PLAYING;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle={'fullScreen'}
        hardwareAccelerated={true}
        visible={modalOpen}
        onRequestClose={() => {
          modalHandler();
        }}>
        <NowPlayingBig
          modalHandler={modalHandler}
          trackTitle={trackTitle}
          trackArtist={trackArtist}
          trackArt={trackArt}
          trackId={trackId}
          playerControls={playerControls}
          duration={duration}
          isShuffled={isShuffled}
          shuffleUpComingPlaylist={shuffleUpComingPlaylist}
          setFavorites={setFavorites}
          favorites={favorites}
          seconds={seconds}
        />
      </Modal>
      <View style={styles.imageWrap}>
        <TouchableOpacity onPress={modalHandler} style={styles.touchableImage}>
          {trackArt ? image : defaultImage}
        </TouchableOpacity>
      </View>
      <View style={styles.rightWrap}>
        <ProgressBar radius={0} />
        <View style={styles.playerWrap}>
          <View style={styles.trackName}>
            <TouchableOpacity onPress={modalHandler} style={styles.touchable}>
              <View styles={styles.textWrap}>
                <TextTicker
                  style={styles.title}
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
            </TouchableOpacity>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.touchableControl}
              onPress={() => playerControls('backwards')}>
              <IonIcon
                style={styles.backwardsIcon}
                name={'md-skip-backward'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => playerControls(isPlaying ? 'pause' : 'play')}
              style={styles.touchableControl}>
              <IonIcon
                style={styles.backwardsIcon}
                name={isPlaying ? 'md-pause' : 'md-play'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => playerControls('forwards')}
              style={styles.touchableControl}>
              <IonIcon
                style={styles.backwardsIcon}
                name={'md-skip-forward'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorDarkGrey = '#222';
const colorBlue = '#2A56B9';
const colorLightBlue = '#0B64D9';
const darkBlue = '#062D83';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 70,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colorBlack,
    position: 'absolute',
    bottom: 0,
  },
  imageWrap: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorDarkGrey,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightWrap: {
    flex: 5,
  },
  playerWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  touchableImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  artist: {
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
  trackName: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    height: '100%',
  },

  controls: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableControl: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NowPlaying;
