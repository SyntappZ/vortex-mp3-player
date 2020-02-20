import React, {Component, useState, useEffect} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Track from '../components/Track';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
import Loader from '../components/Loader';
const screenWidth = Dimensions.get('window').width;

export default class FavoritesScreen extends Component {
  static contextType = PlayerContext;

  getPlaylist = trackId => {
    const {playFromAlbums} = this.context;
    playFromAlbums('2000000', trackId, 'fav');
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

  render() {
    const {renderScreen, tracks} = this.context;
    const favs = tracks.filter(track => track.favorite == true);
    return (
      <View style={styles.container}>
        {favs.length > 0 ? (
          <List
            favorite={this.dataConverter(favs)}
            getPlaylist={this.getPlaylist}
          />
        ) : (
          <Loader />
        )}
      </View>
    );
  }
}

class List extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.props.favorites.getDataForIndex(i).type;
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
  // componentDidMount() {
  //   this._isMounted = true;
  //   getAsyncStorage('favorites').then(data => {
  //     if (this._isMounted) {
  //       this.setState({
  //         favorites: this.state.favorites.cloneWithRows(data),
  //       });
  //     }
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.renderScreen !== prevProps.renderScreen) {
  //     getAsyncStorage('favorites').then(data => {
  //       if (this._isMounted) {
  //         this.setState({
  //           favorites: this.state.favorites.cloneWithRows(data),
  //         });
  //       }
  //     });
  //   }
  // }
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  render() {
    const {favorites} = this.props;
    return (
      <RecyclerListView
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={favorites}
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
    // backgroundColor: colorLightBlack,
  },
});
