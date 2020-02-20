import React, {Component, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AlbumPlaylist from './AlbumPlaylist';
import FolderPlaylist from './FolderPlaylist';
import {DataProvider} from 'recyclerlistview';

const ModalScreen = ({route, navigation}) => {
  const {isAlbumScreen, data} = route.params;

  const closeModal = () => {
    navigation.navigate('MainScreen');
  };

  const dataConverter = tracks => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(tracks);
  };

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  const timeCalc = () => {
    let total = 0;

    data.item.data.forEach(track => (total += Number(track.item.time)));
    return durationConverter(total);
  };

  return isAlbumScreen ? (
    <AlbumPlaylist
      tracklist={dataConverter(data.item.data)}
      data={data.item}
      artist={data.item.data[0].item.artist}
      closeModal={closeModal}
      tracksAmount={data.item.data.length}
      totalTime={timeCalc()}
    />
  ) : (
    <FolderPlaylist
      tracklist={dataConverter(data.item.data)}
      data={data.item}
      closeModal={closeModal}
      tracksAmount={data.item.data.length}
      totalTime={timeCalc()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalScreen;
