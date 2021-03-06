import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Folder from '../components/Folder';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {PlayerContext} from '../player/PlayerFunctions';
const screenWidth = Dimensions.get('window').width;

export default class FoldersScreen extends Component {
  static contextType = PlayerContext;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },
});
