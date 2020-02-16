import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {TracksContext} from '../context/MusicDataProvider';
import Folder from '../components/Folder';

import FolderPlaylist from '../components/FolderPlaylist';
import AsyncStorage from '@react-native-community/async-storage';
const FoldersScreen = ({screenProps, navigation}) => {
  const [folders, setFolders] = useState([]);

  const [chosenFolder, setChosenFolder] = useState({});

  const getFolder = folderData => {
    setChosenFolder(folderData);
    screenProps.openModal(false, folderData);
  };

  const loadFoldersFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('folders');
      if (value !== null) {
        const parseFolders = JSON.parse(value);
        setFolders(parseFolders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFoldersFromStorage();
    return () => {};
  }, []);
  const names = Object.keys(folders)

  const renderItem = ({item}) => (
    <Folder folderName={item} getFolder={getFolder} tracks={folders[item]} />
  );

  return (
    <View style={{flex: 1}}>
      {/* <FlatList
        data={names}
        contentContainerStyle={{paddingBottom: 80}}
        removeClippedSubviews={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      /> */}
    </View>
  );
};

export default FoldersScreen;
