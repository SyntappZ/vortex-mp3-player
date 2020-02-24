import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage, setAsyncStorage} from '../data/AsyncStorage.js';
import {askPermissions} from '../data/MusicDataProvider.js';
import TrackPlayer from 'react-native-track-player';
import Track from '../components/Track.js';
import {ToastAndroid} from 'react-native';
import {getAlbums, getFolders} from '../data/CreateAlbums.js';
import AsyncStorage from '@react-native-community/async-storage';
export const PlayerContext = createContext();

const PlayerFunctions = ({children}) => {
  const playbackState = TrackPlayer.usePlaybackState();
  const [tracks, setTracks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cleanAlbums, setCleanAlbums] = useState([]);
  const [cleanFolders, setCleanFolders] = useState([]);
  const [afterFirstLoad, setIsFirstLoad] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [isMenuOpen, setMenu] = useState(false);
  const [isSearching, setIsSearch] = useState(false);
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const [playlistType, setPlaylistType] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  useEffect(() => {
    if (afterFirstLoad) {
      setAsyncStorage('favorites', favorites);
    }
  }, [favorites]);

  useEffect(() => {
    setIsFirstLoad(true);
    loadFavorites();
    askPermissions().then(tracks => {
      if (tracks) {
        setTracks(tracks);
        createAlbums(tracks);
        createCleanAlbums(tracks);
      } else {
        loadTracksFromStorage();
      }
    });
  }, []);

  useEffect(() => {
    if (afterFirstLoad) {
      ToastAndroid.show(
        `Shuffle is ${isShuffled ? 'on' : 'off'}`,
        ToastAndroid.SHORT,
      );
    }
  }, [isShuffled]);

  useEffect(() => {
    if (afterFirstLoad) {
    }
  }, [isShuffled]);

  const loadFavorites = () => {
    getAsyncStorage('favorites').then(data => {
      setFavorites(data);
    });
  };

  const loadTracksFromStorage = () => {
    getAsyncStorage('tracks').then(data => {
      setTracks(data);
      createAlbums(data);
      createCleanAlbums(data);
      loadAlbumOnSetup();
    });
  };

  const createAlbums = data => {
    getFolders(data, false).then(folders => {
      setFolders(folders);
    });

    getAlbums(data, false).then(albums => {
      setAlbums(albums);
    });
  };

  const createCleanAlbums = data => {
    getFolders(data, true).then(folders => {
      setCleanFolders(folders);
    });

    getAlbums(data, true).then(albums => {
      setCleanAlbums(albums);
    });
  };

  const oneTimeShuffle = async (id, type) => {
    updatePlaylist(id, type);


    setCurrentAlbum([id, type]);
    const playlist = selectPlaylist(id, type);
    await TrackPlayer.reset();
    await TrackPlayer.add(shuffle(playlist));
    await TrackPlayer.play();
    setIsShuffled(true);
  };

  const selectPlaylist = (id, type, trackId) => {
    const favs = tracks.filter(track => favorites.includes(track.id));
    const search = tracks.filter(track => track.id == trackId);

    const copy = arr => [...arr];
    switch (type) {
      case 'folder':
        return copy(cleanFolders[id]);
      case 'album':
        return copy(cleanAlbums[id]);
      case 'favorites':
        return favs
      case 'all':
        return copy(tracks);
      case 'none':
        return search
    }
  };

  const shuffleUpComingPlaylist = async shuffleState => {
    const playlist = selectPlaylist(currentAlbum[0], currentAlbum[1]);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();

    const filterQueue = queue.filter(track => track.id !== currentTrack);

    if (isShuffled) {
      const index = playlist.reduce((a, b, i) => {
        if (b.id === currentTrack) a = i;
        return a;
      });
      const newPlaylist = playlist.filter(
        track => playlist.indexOf(track) > index,
      );
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(newPlaylist);
    } else {
      const shuffledPlaylist = shuffle(filterQueue);
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(shuffledPlaylist);
    }

    if (playbackState === TrackPlayer.STATE_STOPPED) {
      await TrackPlayer.play();
    }
    setIsShuffled(shuffleState);
  };

  const updatePlaylist = (id, type, trackToPlay) => {
    const playlist = {
      playlist: selectPlaylist(id, type, trackToPlay),
      playlistType: type,
      playlistId: id,
    };
    setCurrentPlaylist(playlist);
  };

  const playFromAlbums = async (id, trackToPlay, type) => {
    updatePlaylist(id, type, trackToPlay);
    let nextAlbum = id + type;
    let lastAlbum = currentAlbum.join('');
    let playlist = selectPlaylist(id, type, trackToPlay);

    if (nextAlbum == lastAlbum && !isShuffled) {
      playlist = null;
    }

    if (playlist) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlist);
    }

    if (trackToPlay) {
      await TrackPlayer.skip(trackToPlay);
    }

    await TrackPlayer.play();
    setIsShuffled(false);
    setCurrentAlbum([id, type]);
  };

  const loadAlbumOnSetup = () => {
    getAsyncStorage('lastPlayed').then(async data => {
      await TrackPlayer.add(data);
      const id = data[0].id;

      await TrackPlayer.skip(id);
    });
  };

  const openMenu = () => {
    setMenu(!isMenuOpen);
  };

  const openSearch = value => {
    setIsSearch(!isSearching);
  };

  const data = {
    shuffleUpComingPlaylist: shuffleUpComingPlaylist,
    playFromAlbums: playFromAlbums,
    oneTimeShuffle: oneTimeShuffle,
    isShuffled: isShuffled,
    tracks: tracks,
    folders: folders,
    albums: albums,
    favorites: favorites,
    setFavorites: setFavorites,
    openMenu: openMenu,
    isMenuOpen: isMenuOpen,
    // searchValue:searchValue,
    openSearch: openSearch,
    isSearching: isSearching,
    currentPlaylist: currentPlaylist,
  };
  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  );
};

export default PlayerFunctions;
