import React, {Component} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';

import Track from '../components/Track';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';

import Icon from 'react-native-vector-icons/Entypo';
import FAB from 'react-native-fab';

const screenWidth = Dimensions.get('window').width;
const colorBlue = '#074DD9';

export default class TracksScreen extends Component {
  static contextType = PlayerContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getPlaylist = trackId => {
    const {playFromAlbums} = this.context;
    playFromAlbums('all', trackId, 'all');
  };

  shuffle = () => {
    const {oneTimeShuffle} = this.context;
    oneTimeShuffle('all', 'all');
  };

  listViewConvertor = arr =>
    arr.map(data => ({
      type: 'NORMAL',
      item: data,
    }));

  dataConverter = tracks => {
    const converted = this.listViewConvertor(tracks);
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(converted);
  };

  fabHandler = visible => {
    if (this._isMounted) {
      this.setState({isVisible: visible});
    }
  };

  render() {
    const {tracks} = this.context;
    const icon = (
      <Icon
        style={styles.shuffleIcon}
        name="shuffle"
        size={25}
        color={colorBlue}
      />
    );
    return (
      <View style={styles.container}>
        {tracks.length > 0 ? (
          <List
            tracks={this.dataConverter(tracks)}
            getPlaylist={this.getPlaylist}
            fabHandler={this.fabHandler}
          />
        ) : (
          null
        )}

        <FAB
          buttonColor="white"
          snackOffset={70}
          iconTextColor={colorBlue}
          onClickAction={this.shuffle}
          visible={this.state.isVisible}
          iconTextComponent={icon}
        />
      </View>
    );
  }
}

class List extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {};

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.props.tracks.getDataForIndex(i).type;
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

  rowRenderer = (type, data) => {
    const {artist, duration, id, title} = data.item;
    return (
      <Track
        artist={artist}
        duration={duration}
        trackId={id}
        getPlaylist={this.props.getPlaylist}
        title={title}
      />
    );
  };

  onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const {fabHandler} = this.props;

    if (currentOffset > 400) {
      fabHandler(false);
    }else{
      fabHandler(true)
    }
   
  };

  render() {
    const {tracks} = this.props;

    return (
      <RecyclerListView
        onScroll={this.onScroll}
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={tracks}
        layoutProvider={this.layoutProvider}
      />
    
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },
  fab: {
    position: 'absolute',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    bottom: 70,
    right: 0,
  },
});
