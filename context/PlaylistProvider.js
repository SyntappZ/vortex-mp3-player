import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [trackToPlay, setTrackToPlay] = useState([]);
  const [isAlbumScreen, setIsAlbumScreen] = useState('');
  const [modalData, setModalData] = useState([]);
 
  useEffect(() => {
    loadPlaylistFromStorage();
  }, []);

  const loadPlaylistFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('playlist');

      if (value !== null) {
        const parsePlaylist = JSON.parse(value);
        setPlaylist(parsePlaylist);
        setTrackToPlay(parsePlaylist[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  const playlistShuffler = arr => {
    const shuffledArray = shuffle(arr);
    setPlaylist(shuffledArray);
    setTrackToPlay(null);
   
  };
  const updatePlaylist = (playlist, track) => {
    setPlaylist(playlist);
    setTrackToPlay(track.id);
   
  };

  const getModalDetails = (isAlbumScreen, data) => {
    setIsAlbumScreen(isAlbumScreen);
    setModalData(data);
  };

  const data = {
    playlist: playlist,
    trackToPlay: trackToPlay,
    updatePlaylist: updatePlaylist,
    getModalDetails: getModalDetails,
    isAlbumScreen: isAlbumScreen,
    modalData: modalData,
    playlistShuffler: playlistShuffler,
    
  };
  return (
    <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
