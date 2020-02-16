import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TracksContext} from '../context/MusicDataProvider';
import Album from '../components/Album';
import AsyncStorage from '@react-native-community/async-storage';

import AlbumPlaylist from '../components/AlbumPlaylist';

const AlbumsScreen = ({screenProps, navigation}) => {
  const [myAlbums, setMyAlbums] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  const [album, setAlbum] = useState({});

  const getAlbum = albumData => {
    setAlbum(albumData);
    screenProps.openModal(true, albumData);
  };

  const loadAlbumsFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('albums');

      if (value !== null) {
        const parseAlbums = JSON.parse(value);

        setMyAlbums(parseAlbums);
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    loadAlbumsFromStorage();
  }, []);

  const colorLightBlack = '#131313';
  const names = Object.keys(myAlbums);
   
const bean = Object.entries(myAlbums)
const jeff = bean.map((x, i) => {
  return {
    id: i,
    name: x[0],
  data: x[1],
  image: x[1][0].cover
  }
  
})

const renderItem = ({item}) => (
  <Album albumName={item.name} modalHandler={getAlbum} image={item.image} />
);

  return (
    <View style={{flex: 1, backgroundColor: colorLightBlack}}>
      <FlatList
        contentContainerStyle={{
          margin: 4,
          paddingBottom: 80,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        numColumns={2}
        data={jeff}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AlbumsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
