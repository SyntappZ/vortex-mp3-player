import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Folder from '../components/Folder';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlaylistContext} from '../context/PlaylistProvider';
const screenWidth = Dimensions.get('window').width;

export default class FoldersScreen extends Component {
  static contextType = PlaylistContext;
_isMounted = false

 

  render() {
    const { isFirstLoad } = this.context
    return <List isFirstLoad={isFirstLoad} navigation={this.props.navigation} />;
  }
}

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
    };

    this.rowRenderer = this.rowRenderer.bind(this);

    this.layoutProvider = new LayoutProvider(
      i => {
        return this.state.folders.getDataForIndex(i).type;
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

  componentDidMount() {
    this._isMounted = true
    getAsyncStorage('folders').then(data => {
      if(this._isMounted) {
        this.setState({
          folders: this.state.folders.cloneWithRows(data),
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFirstLoad !== prevProps.isFirstLoad) {
      getAsyncStorage('folders').then(data => {
        if(this._isMounted) {
          this.setState({
            folders: this.state.folders.cloneWithRows(data),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false
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
    const folder = this.state.folders['_data'][folderId];

    this.props.navigation.navigate('Modal', {
      data: folder,
      isAlbumScreen: false,
    });
  };

  render() {
    const {folders} = this.state;
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={this.rowRenderer}
          dataProvider={folders}
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
