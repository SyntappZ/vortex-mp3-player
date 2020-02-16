import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AlbumPlaylist from './AlbumPlaylist';
import FolderPlaylist from './FolderPlaylist';
import {PlaylistContext} from '../context/PlaylistProvider';

const ModalScreen = ({navigation}) => {
  const closeModal = () => {
    navigation.navigate('MainScreen');
  };
  return (
    <PlaylistContext.Consumer>
      {({isAlbumScreen, modalData, playlistShuffler}) => {
        return isAlbumScreen ? (
          <AlbumPlaylist
            modalData={modalData}
            closeModal={closeModal}
            playlistShuffler={playlistShuffler}
          />
        ) : (
          <FolderPlaylist
            modalData={modalData}
            closeModal={closeModal}
            playlistShuffler={playlistShuffler}
          />
        );
      }}
    </PlaylistContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalScreen;
