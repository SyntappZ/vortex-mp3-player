import React, {useState, useEffect} from 'react';
import TextTicker from 'react-native-text-ticker';

import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Track from './Track';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const AlbumPlaylist = ({modalData, closeModal, playlistShuffler}) => {
  const {tracks, albumName, albumImage} = modalData;

  const [TrackAuthor, setAuthor] = useState([]);
  const [totalTime, setTotalTime] = useState('');
  useEffect(() => {
    let author = tracks[0].author;
    let addTime = tracks
      .map(track => track.duration)
      .reduce((a, b) => parseInt(a) + parseInt(b));
    let time = durationConverter(addTime);
    setTotalTime(time);

    setAuthor(author);
  }, []);

  const tracksToShuffle = [...tracks]

  const shuffle = () => playlistShuffler(tracksToShuffle);

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const albumArt = <Image style={styles.image} source={{uri: albumImage}} />;
  const renderItem = ({item}) => <Track track={item} playlist={tracks} />;

  const defaultImage = <IonIcon name="md-disc" size={130} color="#666" />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#062D83" />

      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrap}>
            {albumImage ? albumArt : defaultImage}
          </View>
        </View>
        <View style={styles.information}>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={shuffle} style={styles.touchable}>
              <SimpleLineIcon
                style={styles.backIcon}
                name={'shuffle'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => closeModal()}
              style={styles.touchableRight}>
              <SimpleLineIcon
                style={styles.backIcon}
                name={'arrow-down'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoWrap}>
            <TextTicker
              style={styles.title}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {albumName}
            </TextTicker>
            <Text numberOfLines={1} style={styles.author}>
              {TrackAuthor}
            </Text>
            <Text style={styles.songs}>Songs: {tracks.length}</Text>
            <View style={styles.timeWrap}>
              <Icon name="clock" size={12} color="#ccc" />
              <Text style={styles.totalTime}>{totalTime}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tracklist}>
        <FlatList
          data={tracks}
          removeClippedSubviews={true}
          contentContainerStyle={{paddingBottom: 80}}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={6}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index,
          })}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const colorLightBlack = '#131313';

const darkBlue = '#062D83';

const colorDarkGrey = '#222';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    flex: 1,
    backgroundColor: darkBlue,
    flexDirection: 'row',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  information: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fadeBorder: {
    flex: 1,
    width: 40,
    height: '100%',
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  author: {
    fontSize: 14,
    color: '#eee',
    paddingVertical: 3,
  },
  songs: {
    fontSize: 12,
    color: '#eee',
    paddingTop: 7,
    paddingBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  line: {
    width: '100%',
    height: 3,
    backgroundColor: 'white',
    flex: 4,
  },

  tracklist: {
    flex: 2,
    backgroundColor: colorLightBlack,
  },

  imageWrap: {
    width: 150,
    height: 150,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorDarkGrey,
  },
  timeWrap: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },
  totalTime: {
    color: '#ccc',
    paddingLeft: 4,
    fontWeight: '100',
    fontSize: 12,
  },

  backButton: {
    flex: 1,
    flexDirection: 'row',
  },
  infoWrap: {
    flex: 2,
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 1,
  },
  touchableRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backIcon: {
    padding: 20,
  },
});

export default AlbumPlaylist;
