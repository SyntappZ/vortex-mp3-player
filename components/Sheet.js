import React, {Component, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {PlayerContext} from '../player/PlayerFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';

const Track = ({title, duration}) => {
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
      <TouchableOpacity style={styles.trackTitle}>
        <Text numberOfLines={1} style={styles.smallText}>{title}</Text>
      </TouchableOpacity>
      <View style={styles.duration}>
        <Text style={styles.smallText}>{duration}</Text>
      </View>
    </View>
  );
};

export default class Sheet extends Component {
  static contextType = PlayerContext;
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      albumName: '',
    };
  }

  componentDidMount() {
    const {currentPlaylist} = this.context;
    let album = currentPlaylist[0].album;
    if (!album) {
      album = currentPlaylist[0].folder;
    }
    this.setState({playlist: currentPlaylist, albumName: album});
  }

  componentDidUpdate(prevProps) {
    const {isSheetOpen} = this.props;
    if (isSheetOpen !== prevProps.isSheetOpen) {
      this.RBSheet.open();
    }
  }

  renderItem = ({item}) => {
    return (
      <Track duration={item.duration} trackId={item.id} title={item.title} />
    );
  };

  render() {
    const {albumName, playlist} = this.state;
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={450}
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
            paddingBottom: 10
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.container}>
          <View style={styles.titleWrap}>
            <Text numberOfLines={1} style={styles.text}>
              {albumName}
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
    paddingHorizontal: 20
  },
  tracksScroll: {
    flex: 4,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackTitle: {
    flex: 4,
    
    
    paddingVertical: 15,

  },
  duration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    color: '#666'
  }
  
});
