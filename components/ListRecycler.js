import React, {Component, useState, useEffect} from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';


const screenWidth = Dimensions.get('window').width;

export default class ListRecycler extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {};

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.props.tracks.getDataForIndex(i).type;
      },
      (type, dim) => {
          
        switch (type) {
          case 'NORMAL':
            (dim.width = screenWidth), (dim.height = 50);
            break;
          default:
            dim.width = screenWidth
            dim.height = 50
            break;
        }
      },
    );
  }

  rowRenderer = (type, data) => {
    const {duration, id, title} = data.item;
    return (
      <Track
        closeSheet={this.props.closeSheet}
        duration={duration}
        trackId={id}
        getPlaylist={this.props.getPlaylist}
        title={title}
      />
    );
  };

  render() {
    const {tracks} = this.props;

    return (
      <RecyclerListView
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={tracks}
        layoutProvider={this.layoutProvider}
      />
    );
  }
}
