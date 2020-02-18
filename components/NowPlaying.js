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

import IonIcon from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar';
import NowPlayingBig from '../popupScreens/NowPlayingBig';

import TextTicker from 'react-native-text-ticker';
import TrackPlayer from 'react-native-track-player/index';

const NowPlaying = ({playlist, trackToPlay}) => {
  const playerState = TrackPlayer.usePlaybackState();

  const [modalOpen, setModalOpen] = useState(false);
  const [trackTitle, setTrackTitle] = useState([]);
  const [trackArt, setTrackArt] = useState('');
  const [trackArtist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [currentTrack, setCurrentTrack] = useState('');
  const modalHandler = () => setModalOpen(!modalOpen);

  // const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  // const getCurrentTrack = async () => {
  //   const trackId = await TrackPlayer.getCurrentTrack();
  //   setCurrentTrack(trackId);
  // };
  
    
      
    
    //  getCurrentTrack();
  

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });

    let onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        try {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          setTrackArt('');
          // getCurrentTrack();
          setTrackTitle(track.title);
          setTrackArt(track.artwork);
          setArtist(track.artist);
          setDuration(track.duration);
        } catch (error) {
          console.log(error);
        }

        return () => {
          onTrackChange.remove();
        };
      },
    );
  }, []);

  // const addPlaylistOnload = async (tracks, id) => {
  //   const playlist = tracks.item;

  //   await TrackPlayer.add(playlist);
  // };

   addPlaylistToQueue = async (tracks, id) => {
    console.log(tracks)
    try {
     
        await TrackPlayer.reset();
        await TrackPlayer.add(tracks);
      

   
        TrackPlayer.skip(id);
      
      TrackPlayer.play();
    } catch (error) {
      console.error(error);
    }
  };

  // const convertTrack = track => {
  //   const {id, url, title, author, cover, fileName, duration} = track;

  //   return {
  //     id: id,
  //     url: path,
  //     title: trackTitle,
  //     artist: trackAuthor,
  //     artwork: cover,
  //     duration: duration,
  //   };
  // };

  const trackPlayerController = control => {
    playerControls(control);
  };

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
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          modalHandler();
        }}>
        <NowPlayingBig
          modalHandler={modalHandler}
          trackTitle={trackTitle}
          trackArtist={trackArtist}
          trackArt={trackArt}
          playerControls={playerControls}
          duration={duration}
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
