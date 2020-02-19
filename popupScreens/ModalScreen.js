import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AlbumPlaylist from './AlbumPlaylist';
import FolderPlaylist from './FolderPlaylist';


const ModalScreen = ({route, navigation}) => {
  const {isAlbumScreen, data} = route.params;

  // const [totalTime, setTotalTime] = useState(0)

  // console.log(data)
  // useEffect(() => {

  // }, [])

  const closeModal = () => {
    navigation.navigate('MainScreen');
  };
 

  return isAlbumScreen ? (
    <AlbumPlaylist
      tracklist={data.item.data}
      data={data.item}
      artist={data.item.data[0].item.artist}
      closeModal={closeModal}
      tracksAmount={data.item.data.length}
      // playlistShuffler={playlistShuffler}
    />
  ) : (
    <FolderPlaylist
      tracklist={data.item.data}
      data={data.item}
      closeModal={closeModal}
      tracksAmount={data.item.data.length}


      // playlistShuffler={playlistShuffler}
    />
  );
  // return (
  //   <View></View>
  // )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalScreen;
