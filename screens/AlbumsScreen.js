import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import Album from '../components/Album';
import {RecyclerListView, DataProvider, AutoScroll} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
import LayoutProvider from '../components/LayoutProvider';
import {Overlay, Button} from 'react-native-elements';
const screenWidth = Dimensions.get('window').width;

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export default class AlbumsScreen extends Component {
  _isMounted = false;
  state = {
    isOpen: false,
  };
  static contextType = PlayerContext;

  dataConverter = tracks => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
  };

  componentDidMount() {
    this._isMounted = true;
    const {isFirstInstall} = this.context;
    if (this._isMounted) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({isOpen: isFirstInstall});
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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
                title="Close"
              />
            </View>
          </View>
        </Overlay>

        {albums.length > 0 ? (
          <List
            albums={albums}
            navigation={this.props.navigation}
            isFirstInstall={isFirstInstall}
          />
        ) : null}
      </View>
    );
  }
}

const data = Array(100).fill({type: 'heff', value: 'hello'});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(this.props.albums),
    };
    this._layoutProvider = new LayoutProvider(this.state.dataProvider);
    this._renderRow = this._renderRow.bind(this);
  }

  openModal = albumId => {
     const album = this.props.albums[albumId];

    this.props.navigation.navigate('Modal', {
      data: album,
      isAlbumScreen: true,
    });
  };

  _renderRow(type, data) {
    const {name, artwork, tracksAmount, albumId} = data.item;
    const {isFirstInstall} = this.props;
    return (
      <View style={styles.containerGrid}>
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
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <RecyclerListView
          rowRenderer={this._renderRow}
          dataProvider={this.state.dataProvider}
          layoutProvider={this._layoutProvider}
        />
      </View>
    );
  }

  // openModal = albumId => {
  //   const album = this.props.albums._data[albumId];

  //   this.props.navigation.navigate('Modal', {
  //     data: album,
  //     isAlbumScreen: true,
  //   });
  // };

  // rowRenderer(type, data) {
  //   const {name, artwork, tracksAmount, albumId} = data.item;
  //   const {isFirstInstall} = this.props;
  //   console.log('type ' + type)
  //   switch (type) {
  //     case ViewTypes.HALF_LEFT:
  //       return (
  //         <View style={styles.containerGridLeft}>
  //           <Album
  //             albumName={name}
  //             artwork={artwork}
  //             tracksAmount={tracksAmount}
  //             openModal={this.openModal}
  //             albumId={albumId}
  //             isFirstInstall={isFirstInstall}
  //           />
  //         </View>
  //       );
  //     case ViewTypes.HALF_RIGHT:
  //       return (
  //         <View style={styles.containerGridRight}>
  //           <Album
  //             albumName={name}
  //             artwork={artwork}
  //             tracksAmount={tracksAmount}
  //             openModal={this.openModal}
  //             albumId={albumId}
  //             isFirstInstall={isFirstInstall}
  //           />
  //         </View>
  //       );
  //     default:
  //       return null;
  //   }
  // }
  // render() {
  //   const {albums} = this.props;

  //   return (
  //     <RecyclerListView
  //       // eslint-disable-next-line react-native/no-inline-styles
  //       style={{flex: 1}}
  //       rowRenderer={this.rowRenderer}
  //       dataProvider={albums}
  //       layoutProvider={this.layoutProvider}
  //     />
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },

  listContainer: {
    paddingVertical: 15,
    flex: 1
  },

  containerGrid: {
    flex: 1,
    height: 'auto',
    paddingHorizontal: 10,
    // margin: 5,
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
