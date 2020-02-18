import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage} from '../data/AsyncStorage.js';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [trackToPlay, setTrackToPlay] = useState([]);
 
  const [tracks, setTracks] = useState([])
  const [folders, setFolders] = useState([])
  const [albums, setAlbums] = useState([])
  const [lastPlaylist, setLastPlaylist] = useState('')

  useEffect(() => {
    loadTracksFromStorage()
  }, []);

  const loadTracksFromStorage = () => {
    getAsyncStorage('tracks').then(data => {
      setTracks(data.map(track => track.item))
      
    });
    getAsyncStorage('albums').then(data => {
      setAlbums(data.map(album => album.item.data.map(track => track.item)))
      
    });
     getAsyncStorage('folders').then(data => {
      setFolders(data.map(folder => folder.item.data.map(track => track.item)))
    });
  }

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  const playlistShuffler = arr => {
    const shuffledArray = shuffle(arr);
    setPlaylist(shuffledArray);
    setTrackToPlay(null);
   
  };

  const playlistDeployer = (playlist, track) => {
    
    setPlaylist(playlist)
    setTrackToPlay(track)
  }

  const playlistRetriever = (playlistId, trackId, type) => {
    // console.log('last ' + lastPlaylist) 
    // console.log('now ' + playlistId)
    // let currentFolder, currentAlbum
    // if(lastPlaylist == playlistId) {
    //   currentFolder = null
    //   currentAlbum = null
    // }else{
    // let currentAlbum = albums[playlistId]
    //  let currentFolder = folders[playlistId]
    //   setLastPlaylist(playlistId)
    // }
    
    // switch(type) {
    //   case 'all': playlistDeployer(tracks, trackId)
    //   break;
    //   case 'folder': playlistDeployer(currentFolder, trackId)
    //   break;
    //   case 'album': playlistDeployer(currentAlbum, trackId)
    // }
  };

  

  const data = {
    playlist: playlist,
    trackToPlay: trackToPlay,
    playlistRetriever: playlistRetriever,
    playlistShuffler: playlistShuffler,
    playlistDeployer: playlistDeployer,
   
  };
  return (
    <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
