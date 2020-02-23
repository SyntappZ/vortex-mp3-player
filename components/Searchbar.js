import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Track from './Track';
import {PlayerContext} from '../player/PlayerFunctions';
export default class Searchbar extends Component {
  static contextType = PlayerContext;
  state = {
    search: null,
  };

  updateSearch = search => {
    this.setState({search: search.toLowerCase()});
  };

  getPlaylist = trackId => {
    const {playFromAlbums} = this.context;
    playFromAlbums('none', trackId, 'none');
    this.props.closeSearch()
  };

  renderItem = ({item}) => {
    return (
      <Track
        artist={item.artist}
        duration={item.duration}
        trackId={item.id}
        getPlaylist={this.getPlaylist}
        title={item.title}
        
      />
    );
  };

  render() {
    const {search} = this.state;
    const {tracks} = this.context;
    const filteredTracks = [];
    tracks.forEach(track => {
      let query = search;
      query === '' ? (query = null) : (query = query);

      if (
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query)
      ) {
        filteredTracks.push(track);
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.searchWrap}>
          <SearchBar
            inputContainerStyle={{backgroundColor: '#222'}}
            containerStyle={styles.searchbarContainer}
            placeholder="Search Tracks..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        <View style={styles.results}>
          <FlatList
            data={filteredTracks}
            renderItem={this.renderItem}
            keyExtractor={item => item.index.toString()}
          />
        </View>
      </View>
    );
  }
}

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';
const darkBlue = '#062D83';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBlack,
  },
  searchbarContainer: {
    backgroundColor: colorLightBlack,
  },
  text: {
    color: 'white',
  },
  searchWrap: {
    flex: 1,
  },
  results: {
    flex: 6,
  },
});
