import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Folder from '../components/Folder';
import {getAsyncStorage} from '../data/AsyncStorage.js';


export default class FoldersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
    };
  }
  componentDidMount() {
    getAsyncStorage('folders').then(data => {
      this.setState({folders: data});
    });
  }

  renderItem = ({item}) => (
    <Folder
      folderName={item.name}
      tracksAmount={item.tracksAmount}
      id={item.id}
    />
  );
  render() {
    const {folders} = this.state;
    return (
      <View style={styles.container}>
        {/* <FlatList
          data={folders}
          contentContainerStyle={{paddingBottom: 80}}
          removeClippedSubviews={true}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
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


