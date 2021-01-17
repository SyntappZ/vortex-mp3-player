import React, {Component} from 'react';
import TextTicker from 'react-native-text-ticker';
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
import ImgToBase64 from 'react-native-image-base64';

import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Track from '../components/Track';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const screenWidth = Dimensions.get('window').width;
export default class AlbumPlaylist extends Component {
  static contextType = PlayerContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isShuffled: false,
      image: ''
    };

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.props.tracklist.getDataForIndex(i).type;
      },
      (type, dim) => {
        switch (type) {
          case 'NORMAL':
            (dim.width = screenWidth), (dim.height = 70);
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      },
    );
  }

  getPlaylist = trackId => {
    const {albumId} = this.props.data;
    const {playFromAlbums} = this.context;
    playFromAlbums(albumId, trackId, 'album', false);
  };

  rowRenderer = (type, data) => {
    const {artist, duration, id, title} = data.item;
    return (
      <Track
        artist={artist}
        duration={duration}
        getPlaylist={this.getPlaylist}
        trackId={id}
        title={title}
      />
    );
  };

  // getArt = async () => {
  //   console.log('fetching art')
  //   const {name} = this.props.data;
  //   const {artist} = this.props;

  //   const response = await fetchAlbumArt(artist, name);
  //   // console.log(response);
  // };
  componentDidMount() {
    const {artwork} = this.props.data;
    this.convertImage(artwork)
  }

  // recursionImages = data => {
  //   console.log(data[0]);
  // };

  convertImage = async file => {
    try {
      if (file) {
        const base64String = await ImgToBase64.getBase64String(file);
        this.setState({image: "data:image/png;base64," + base64String})
      }
    } catch (error) {
      console.log(error);
    }
  };

  durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  shuffle = () => {
    const {oneTimeShuffle} = this.context;
    const {albumId} = this.props.data;
    oneTimeShuffle(albumId, 'album');
  };

  render() {
    const {artwork, name, tracksAmount} = this.props.data;
    const {artist, closeModal, tracklist, totalTime} = this.props;
const {image} = this.state
    const albumArt = <Image style={styles.image} source={{uri:image}} />;

    const defaultImage = <IonIcon name="md-disc" size={130} color="#666" />;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#062D83" animated={true} />

        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrap}>
              {image ? albumArt : defaultImage}
            </View>
          </View>
          <View style={styles.information}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={this.shuffle} style={styles.touchable}>
                <SimpleLineIcon
                  style={styles.backIcon}
                  name={'shuffle'}
                  size={20}
                  color={'#fff'}
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
                {name}
              </TextTicker>
              <Text numberOfLines={1} style={styles.author}>
                {artist}
              </Text>
              <Text style={styles.songs}>Songs: {tracksAmount}</Text>
              <View style={styles.timeWrap}>
                <Icon name="clock" size={12} color="#ccc" />
                <Text style={styles.totalTime}>{totalTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tracklist}>
          {tracksAmount > 0 ? (
            <RecyclerListView
              style={{flex: 1}}
              rowRenderer={this.rowRenderer}
              dataProvider={tracklist}
              layoutProvider={this.layoutProvider}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const colorLightBlack = '#131313';

const darkBlue = '#062D83';

const colorDarkGrey = '#222';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
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
