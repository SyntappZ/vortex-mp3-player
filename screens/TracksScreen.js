import React, {Component, useState, useEffect} from 'react';

import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Track from '../components/Track';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const screenWidth = Dimensions.get('window').width;

export default class TracksScreen extends Component {
  constructor(props) {
    // console.log(arr)

    // for (let i = 0; i < 50; i++) {
    //   arr.push({
    //     type: 'NORMAL',
    //     item: {
    //       id: i.toString(),
    //       title: 'tom',
    //       duration: '3:00',
    //       artist: 'bob and the bobs'
    //     },
    //   });
    // }

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
    return <Track artist={artist} duration={duration} id={id} title={title} />;
  };
  componentDidMount() {

    getAsyncStorage('tracks').then(data => {
      
      this.setState({
        tracks: this.state.tracks.cloneWithRows(data),
      });
    });
  }

  // renderItem = ({item}) => <Track artist={item.artist} duration={item.duration} id={item.id} title={item.title} />;
  render() {
    const {tracks} = this.state;
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.tracks}
          layoutProvider={this.layoutProvider}
        />
        {/* <FlatList
        data={tracks}
        removeClippedSubviews={true}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={this.renderItem}
        keyExtractor={item => item.flatlistId}
      /> */}
      </View>
    );
  }
}

const colorLightBlack = '#131313';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorLightBlack,
  },
});
