import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Album from '../components/Album'
const Tester = ({albumName}) => {
  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <Text>{albumName}</Text>
    </View>
  );
};

const AlbumsScreen = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    console.log('get data');
    getAsyncStorage('albums').then(data => {
      setAlbums(data);
    });
  }, []);

  
const renderItem = ({item}) => (
  <Album albumName={item.name} artwork={item.artwork} data={item.data} />
)

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
  },
  text: {
    color: 'white',
  },
});

export default AlbumsScreen;
