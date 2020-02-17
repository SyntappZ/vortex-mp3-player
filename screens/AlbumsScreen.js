import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Album from '../components/Album';

export default class AlbumsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
    };
  }
  componentDidMount() {
    getAsyncStorage('albums').then(data => {
      this.setState({albums: data});
    });
  }

  renderItem = ({item}) => (
    <Album albumName={item.name} artwork={item.artwork} tracksAmount={item.tracksAmount} data={item.data} />
  );
  render() {
    const { albums } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            margin: 4,
            paddingBottom: 80,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          numColumns={2}
          data={albums}
          removeClippedSubviews={true}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}



const colorLightBlack = '#131313';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
});
