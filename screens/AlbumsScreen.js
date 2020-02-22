import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Album from '../components/Album';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
import Loader from '../components/Loader'
const screenWidth = Dimensions.get('window').width;

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export default class AlbumsScreen extends Component {
  static contextType = PlayerContext;
  

  dataConverter = tracks => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
  };

  render() {
    const {albums} = this.context;
   
    return (
      <View style={styles.container}>
        {albums.length > 0 ? (
          <List
            albums={this.dataConverter(albums)}
            navigation={this.props.navigation}
          />
        ) : <Loader />}
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

const colorLightBlack = '#131313';
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
});
