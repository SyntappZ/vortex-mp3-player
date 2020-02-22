import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    const colorBlack = '#0D0D0D';
    const colorLightBlack = '#131313';
    const colorBlue = '#074DD9';
    const colorLightBlue = '#0B64D9';

    return (
      <View style={styles.container}>
        <SearchBar
          inputContainerStyle={{backgroundColor: '#222'}}
          containerStyle={styles.searchbarContainer}
          placeholder="Search Songs..."
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  searchbarContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
