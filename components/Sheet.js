import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {PlayerContext} from '../player/PlayerFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';

const Track = ({title, duration, getPlaylist, closeSheet, trackId}) => {
  const close = () => {
    closeSheet();
    getPlaylist(trackId);
  };
  return (
    <View style={styles.track}>
      <TouchableOpacity style={styles.icon}>
        <Icon
          style={styles.heartIcon}
          name="heart-o"
          size={20}
          color={'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={close} style={styles.trackTitle}>
        <Text numberOfLines={1} style={styles.smallText}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.duration}>
        <Text style={styles.smallText}>{duration}</Text>
      </View>
    </View>
  );
};

export default class Sheet extends Component {
  static contextType = PlayerContext;
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      playlistName: '',
    };
  }

  playlistName = type => {
     const {currentPlaylist} = this.context;
    
    switch (type) {
      case 'folder':
        return currentPlaylist.playlist[0].folder;
      case 'album':
        return currentPlaylist.playlist[0].album;
      case 'favorites':
        return 'favorites';
      case 'all':
        return 'All Tracks';
      case 'none':
        return currentPlaylist.playlist[0].title;
    }
  };

  componentDidMount() {
    this._isMounted = true;
  
    if (this._isMounted) {
       const {currentPlaylist} = this.context;
      this.setState({
        playlist: currentPlaylist.playlist,
        playlistName: this.playlistName(currentPlaylist.playlistType),
      });
    }
  }

  closeSheet = () => this.RBSheet.close();

  componentDidUpdate(prevProps) {
    const {isSheetOpen} = this.props;
    if (isSheetOpen !== prevProps.isSheetOpen) {
      this.RBSheet.open();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  getPlaylist = trackId => {
    const {playFromAlbums, currentPlaylist} = this.context;
    const {playlistType, playlistId} = currentPlaylist;

    playFromAlbums(playlistId, trackId, playlistType);
  };

  renderItem = ({item}) => {
    return (
      <Track
        duration={item.duration}
        getPlaylist={this.getPlaylist}
        trackId={item.id}
        title={item.title}
        closeSheet={this.closeSheet}
      />
    );
  };

  render() {
     const {playlistName, playlist} = this.state;
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={550}
        duration={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={'slide'}
        customStyles={{
          container: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 10,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.container}>
          <View style={styles.titleWrap}>
            <Text numberOfLines={1} style={styles.text}>
              {playlistName}
            </Text>
          </View>
          <View style={styles.tracksScroll}>
            <FlatList
              data={playlist}
              renderItem={this.renderItem}
              keyExtractor={item => item.index.toString()}
            />
          </View>
        </View>
      </RBSheet>
    );
  }
}

const darkBlue = '#062D83';
const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorDarkGrey = '#222';
const colorBlue = '#2A56B9';
const colorLightBlue = '#0B64D9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 5,
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
  titleWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tracksScroll: {
    flex: 4,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,

  },
  trackTitle: {
    flex: 4,
    justifyContent: 'center',
   
    height: 50,

  },
  duration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,

  },
  smallText: {
    color: '#666',
  },
});
