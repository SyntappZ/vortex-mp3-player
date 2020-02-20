import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Folder from '../components/Folder';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
const screenWidth = Dimensions.get('window').width;

export default class FoldersScreen extends Component {
  static contextType = PlayerContext;
  _isMounted = false;

  dataConverter = tracks => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
  };

  render() {
    const {folders} = this.context;

    return (
      <View style={styles.container}>
        {folders.length > 0 ? (
          <List
            folders={this.dataConverter(folders)}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);

  

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.props.folders.getDataForIndex(i).type;
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

  // componentDidMount() {
  //   this._isMounted = true;
  //   getAsyncStorage('folders').then(data => {
  //     if (this._isMounted) {
  //       this.setState({
  //         folders: this.state.folders.cloneWithRows(data),
  //       });
  //     }
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.isFirstLoad !== prevProps.isFirstLoad) {
  //     getAsyncStorage('folders').then(data => {
  //       if (this._isMounted) {
  //         this.setState({
  //           folders: this.state.folders.cloneWithRows(data),
  //         });
  //       }
  //     });
  //   }
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  rowRenderer = (type, data) => {
    const {name, tracksAmount, folderId} = data.item;
    return (
      <Folder
        folderName={name}
        tracksAmount={tracksAmount}
        openModal={this.openModal}
        folderId={folderId}
      />
    );
  };

  openModal = folderId => {
    const folder = this.props.folders['_data'][folderId];

    this.props.navigation.navigate('Modal', {
      data: folder,
      isAlbumScreen: false,
    });
  };

  render() {
    const {folders} = this.props;
    return (
      <RecyclerListView
        style={{flex: 1}}
        rowRenderer={this.rowRenderer}
        dataProvider={folders}
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
