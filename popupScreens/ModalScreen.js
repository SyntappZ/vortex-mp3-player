import React from 'react';

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

  const durationConverter = d => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' min' : ' mins') : '';

    return hDisplay + mDisplay;
  };

  const timeCalc = () => {
    let total = 0;

    data.item.data.forEach(track => (total += Number(track.item.seconds)));
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

export default ModalScreen;
