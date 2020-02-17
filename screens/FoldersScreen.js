import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Folder from '../components/Folder';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const screenWidth = Dimensions.get('window').width;

export default class FoldersScreen extends Component {
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
    getAsyncStorage('folders').then(data => {
      this.setState({
        folders: this.state.folders.cloneWithRows(data),
      });
    });
  }

  openModal = (folderId) => {
   
    const folder = this.state.folders['_data'][folderId]
    
     this.props.navigation.navigate('Modal',{
       data: folder,
       isAlbumScreen: false
     });
  }

  rowRenderer = (type, data) => {
    const {name, tracksAmount, folderId} = data.item;
    return <Folder folderName={name} tracksAmount={tracksAmount} openModal={this.openModal} folderId={folderId} />;
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
    // backgroundColor: colorLightBlack,
  },
});
