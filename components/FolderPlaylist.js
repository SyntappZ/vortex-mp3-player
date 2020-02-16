import React, {useState, useEffect} from 'react';
import TextTicker from 'react-native-text-ticker';

import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Track from './Track';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const FolderPlaylist = ({modalData, closeModal, playlistShuffler}) => {
  const {tracks, folderName} = modalData;
  const [totalTime, setTotalTime] = useState('');

  useEffect(() => {
    let addTime = tracks
      .map(track => track.duration)
      .reduce((a, b) => parseInt(a) + parseInt(b));
    let time = durationConverter(addTime);
    setTotalTime(time);
  }, []);

  const tracksToShuffle = [...tracks]

  const shuffle = () => playlistShuffler(tracksToShuffle);

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const renderItem = ({item}) => <Track track={item} playlist={tracks} />;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#062D83" />

      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrap}>
            <EntypoIcon
              style={styles.backIcon}
              name={'folder-music'}
              size={70}
              color="#fff"
            />
          </View>
          <View style={styles.titleWrap}>
            <TextTicker
              style={styles.title}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {folderName}
            </TextTicker>
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
          windowSize={10}
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
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  titleWrap: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },

  infoWrap: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageWrap: {
    flex: 1,
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

  songs: {
    fontSize: 12,
    color: '#eee',
    paddingTop: 7,
  },

  line: {
    width: '100%',
    height: 3,
    backgroundColor: 'white',
    flex: 4,
  },

  tracklist: {
    flex: 3,
    backgroundColor: colorLightBlack,
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

export default FolderPlaylist;
