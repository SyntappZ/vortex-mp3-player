import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Track from '../components/Track';
import {PlayerContext} from '../player/PlayerFunctions';
export default class Searchbar extends Component {
  static contextType = PlayerContext;
  state = {
    search: null,
    filteredTracks: [],
  };

  updateSearch = inputText => {
    this.setState({search: inputText});
    this.getSearchResults(inputText);
  };

  getPlaylist = (trackId, track) => {
    // this.props.navigation.goBack();
    const {playFromSearch} = this.context;
    const {filteredTracks} = this.state;
    playFromSearch(trackId, track, filteredTracks);
  };
  matched = (track, searchQuery) => {
    const artistName =
      track.artist !== 'Unknown' ? track.artist.toLowerCase() : null;
    let trackName = track.title.toLowerCase();

    if (artistName) {
      trackName = trackName + artistName;
    }

    return trackName.includes(searchQuery);
  };

  getSearchResults = inputText => {
    const searchQuery = inputText.toLowerCase();
    const {tracks} = this.context;

    const filtered = tracks.filter(track => {
      return this.matched(track, searchQuery);
    });
    if (inputText) {
      this.setState({filteredTracks: filtered});
    } else {
      this.setState({filteredTracks: []});
    }
  };

  renderItem = ({item}) => {
    return (
      <Track
        artist={item.artist}
        duration={item.duration}
        trackId={item.id}
        getPlaylist={this.getPlaylist}
        title={item.title}
        track={item}
      />
    );
  };

  render() {
    const {filteredTracks, search} = this.state;
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
            keyboardShouldPersistTaps={'handled'}
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
