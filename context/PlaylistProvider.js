import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {askPermissions} from '../data/MusicDataProvider.js';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [trackToPlay, setTrackToPlay] = useState([]);
  const [lastPlaylist, setLastPlaylist] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState('')
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

  const playlistShuffler = (id, type) => {
    let shuffledArray, shuffleId, folder = [...folders], album = [...albums]

    if (type === 'album') {
      shuffledArray = shuffle(album[id]);
      shuffleId = `shuffleAlbum${id}`
    } else if (type === 'folder') {
      shuffledArray = shuffle(folder[id]);
      shuffleId = `shuffleFolder${id}`
    }

    setPlaylist(shuffledArray);
    setTrackToPlay(null);
    setCurrentAlbum(shuffleId)
  };

  const playlistDeployer = (playlist, track, playing) => {
    setPlaylist(playlist);
    setTrackToPlay(track);
    setCurrentAlbum(playing)
  };

  const playlistRetriever = (id, trackId, type) => {
    if (type === 'all') {
      playlistDeployer(tracks, trackId, 'all');
    } else if (type === 'folder') {
      playlistDeployer(folders[id], trackId, `folder${id}`);
    } else {
      playlistDeployer(albums[id], trackId, `album${id}`);
    }
  };

  const data = {
    playlist: playlist,
    trackToPlay: trackToPlay,
    playlistRetriever: playlistRetriever,
    playlistShuffler: playlistShuffler,
    isFirstLoad: isFirstLoad,
    currentAlbum: currentAlbum
  };
  return (
    <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
