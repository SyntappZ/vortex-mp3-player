import React, {Component} from 'react';
import TextTicker from 'react-native-text-ticker';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Track from '../components/Track';

import Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
const screenWidth = Dimensions.get('window').width;
export default class FolderPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        this.props.tracklist,
      ),
      totalTime: 0,
    };

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.state.tracks.getDataForIndex(i).type;
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

  componentDidMount() {
    let total = 0;
    const {tracklist} = this.props;
    tracklist.forEach(track => (total += Number(track.item.time)));
    this.setState({totalTime: this.durationConverter(total)});
  }

  durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  rowRenderer = (type, data) => {
    const {artist, duration, id, title} = data.item;
    return <Track artist={artist} duration={duration} id={id} title={title} />;
  };

  render() {
    const {name, trackAmount} = this.props.data;
    const {closeModal} = this.props;
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
                {name}
              </TextTicker>
            </View>
          </View>
          <View style={styles.information}>
            <View style={styles.backButton}>
              <TouchableOpacity style={styles.touchable}>
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
              <Text style={styles.songs}>Songs: {trackAmount}</Text>
              <View style={styles.timeWrap}>
                <Icon name="clock" size={12} color="#ccc" />
                <Text style={styles.totalTime}>{this.state.totalTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tracklist}>
          <RecyclerListView
            style={{flex: 1}}
            rowRenderer={this.rowRenderer}
            dataProvider={this.state.tracks}
            layoutProvider={this.layoutProvider}
          />
        </View>
      </View>
    );
  }
}

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