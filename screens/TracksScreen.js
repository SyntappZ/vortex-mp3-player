import React, {Component, useState, useEffect} from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Track from '../components/Track';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlaylistContext} from '../context/PlaylistProvider';
const screenWidth = Dimensions.get('window').width;

export default class TracksScreen extends Component {
  static contextType = PlaylistContext;

  getPlaylist = trackId => {
    const {playlistRetriever} = this.context;
    playlistRetriever('1000000', trackId, 'all');
  };

  render() {
    const { isFirstLoad } = this.context

  return <List isFirstLoad={isFirstLoad} getPlaylist={this.getPlaylist}/>;
  }
}

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
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
  componentDidMount() {
    getAsyncStorage('tracks').then(data => {
      this.setState({
        tracks: this.state.tracks.cloneWithRows(data),
      });
    });
  }


  componentDidUpdate(prevProps) {
    if (this.props.isFirstLoad !== prevProps.isFirstLoad) {
      getAsyncStorage('tracks').then(data => {
        this.setState({
          tracks: this.state.tracks.cloneWithRows(data),
        });
      });
    }
  }

  render() {
    const {tracks} = this.state;
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={this.rowRenderer}
          dataProvider={tracks}
          layoutProvider={this.layoutProvider}
        />
      </View>
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
