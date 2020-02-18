import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {askPermissions} from '../data/MusicDataProvider.js';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [trackToPlay, setTrackToPlay] = useState([]);
  const [lastPlaylist, setLastPlaylist] = useState('');

  const [tracks, setTracks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [load, setLoad] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    loadTracksFromStorage();

    askPermissions().then(isFirst => {
      if (isFirst) {
        setIsFirstLoad(isFirst);
      }
    });
  }, []);

  useEffect(() => {}, []);

  const loadTracksFromStorage = () => {
    getAsyncStorage('tracks').then(data => {
      setTracks(data.map(track => track.item));
    });
    getAsyncStorage('albums').then(data => {
      setAlbums(data.map(album => album.item.data.map(track => track.item)));
    });
    getAsyncStorage('folders').then(data => {
      setFolders(data.map(folder => folder.item.data.map(track => track.item)));
    });
  };

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  const playlistShuffler = (id, type, isShuffled) => {
    let shuffledArray;
    if (type === 'album') {
      shuffledArray = shuffle(albums[id]);

      // shuffledArray = albums[id]
    } else if (type === 'folder') {
      if (isShuffled) {
        shuffledArray = shuffle(folders[id]);
      } else {
        shuffledArray = folders[id];
      }
    }

    setPlaylist(shuffledArray);
    setTrackToPlay(null);
  };

  const playlistDeployer = (playlist, track) => {
    setPlaylist(playlist);
    setTrackToPlay(track);
  };

  const playlistRetriever = (playlistId, trackId, type) => {
    if (type === 'all') {
      playlistId === lastPlaylist
        ? playlistDeployer(null, trackId)
        : playlistDeployer(tracks, trackId);
      setLastPlaylist(playlistId);
    } else if (type === 'folder') {
      `folder${playlistId}` === lastPlaylist
        ? playlistDeployer(null, trackId)
        : playlistDeployer(folders[playlistId], trackId);
      setLastPlaylist(`folder${playlistId}`);
    } else {
      `album${playlistId}` === lastPlaylist
        ? playlistDeployer(null, trackId)
        : playlistDeployer(albums[playlistId], trackId);
      setLastPlaylist(`album${playlistId}`);
    }
  };

  const data = {
    playlist: playlist,
    trackToPlay: trackToPlay,
    playlistRetriever: playlistRetriever,
    playlistShuffler: playlistShuffler,
    isFirstLoad: isFirstLoad,
  };
  return (
    <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
