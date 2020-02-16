import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Folder from '../components/Folder';
import {getAsyncStorage} from '../data/AsyncStorage.js';
const FoldersScreen = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getAsyncStorage('folders').then(data => {
      setFolders(data);
    });
  }, []);

  const renderItem = ({item}) => (
    <Folder folderName={item.name} trackAmount={item.trackAmount} id={item.id} />
  );

  return (
    <View style={styles.container}>
        <FlatList
        data={folders}
        contentContainerStyle={{paddingBottom: 80}}
        removeClippedSubviews={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const colorLightBlack = '#131313';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorLightBlack,
  },
});

export default FoldersScreen;
