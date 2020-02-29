import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import Album from '../components/Album';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';

import {Overlay, Button} from 'react-native-elements';
const screenWidth = Dimensions.get('window').width;

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export default class AlbumsScreen extends Component {
  state = {
    isOpen: false,
  };
  static contextType = PlayerContext;

  dataConverter = tracks => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
  };

  componentDidMount() {
    const {isFirstInstall} = this.context;
    this.setState({isOpen: isFirstInstall});
  }

  render() {
    const {albums, isFirstInstall} = this.context;
    const {isOpen} = this.state;

    return (
      <View style={styles.container}>
        <Overlay isVisible={isOpen} height={'50%'}>
          <View style={styles.overlayContainer}>
            <View styles={styles.centerWrap}>
              <Text style={styles.overlayTitle}>Vortex Player</Text>
              <Text style={styles.overlayText}>
                Please allow a minute for the album images to load, this only
                occurs once and they never have to loaded again, thank you.
              </Text>
              <Button
                onPress={() => this.setState({isOpen: false})}
                title="Close"></Button>
            </View>
          </View>
        </Overlay>

        {albums.length > 0 ? (
          <List
            albums={this.dataConverter(albums)}
            navigation={this.props.navigation}
            isFirstInstall={isFirstInstall}
          />
        ) : null}
      </View>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      index => {
        if (index % 2 === 0) {
          return ViewTypes.HALF_LEFT;
        } else if (index % 2 === 1) {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = screenWidth / 2;
            dim.height = 215;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = screenWidth / 2;
            dim.height = 215;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );
  }

  openModal = albumId => {
    const album = this.props.albums['_data'][albumId];

    this.props.navigation.navigate('Modal', {
      data: album,
      isAlbumScreen: true,
    });
  };

  rowRenderer(type, data) {
    const {name, artwork, tracksAmount, albumId} = data.item;
    const {isFirstInstall} = this.props;
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <View style={styles.containerGridLeft}>
            <Album
              albumName={name}
              artwork={artwork}
              tracksAmount={tracksAmount}
              openModal={this.openModal}
              albumId={albumId}
              isFirstInstall={isFirstInstall}
            />
          </View>
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <View style={styles.containerGridRight}>
            <Album
              albumName={name}
              artwork={artwork}
              tracksAmount={tracksAmount}
              openModal={this.openModal}
              albumId={albumId}
              isFirstInstall={isFirstInstall}
            />
          </View>
        );
      default:
        return null;
    }
  }
  render() {
    const {albums} = this.props;

    return (
      <RecyclerListView
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={albums}
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
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    height: 215,
    paddingHorizontal: 7,
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    height: 215,
    paddingHorizontal: 7,
  },
  text: {
    color: 'white',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  overlayText: {
    textAlign: 'center',
    paddingBottom: 30,
  },
});
