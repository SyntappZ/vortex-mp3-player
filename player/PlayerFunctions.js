import React, {createContext, useRef, useEffect, useState} from 'react';
import {getAsyncStorage, setAsyncStorage} from '../data/AsyncStorage.js';
import {askPermissions} from '../data/MusicDataProvider.js';
import TrackPlayer from 'react-native-track-player';
import {ToastAndroid} from 'react-native';
import {getAlbums, getFolders} from '../data/CreateAlbums.js';
import {getRefresher} from '../data/RefreshData.js';
export const PlayerContext = createContext();

const PlayerFunctions = ({children}) => {
  const isMounted = useRef(true);
  const playbackState = TrackPlayer.usePlaybackState();
  const [tracks, setTracks] = useState([]);
  const [isRepeat, setRepeat] = useState(false);
  const [folders, setFolders] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cleanAlbums, setCleanAlbums] = useState([]);
  const [cleanFolders, setCleanFolders] = useState([]);
  const [afterFirstLoad, setIsFirstLoad] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState([]);
  const [isMenuOpen, setMenu] = useState(false);
  const [isSearching, setIsSearch] = useState(false);
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  const [currentTrack, setCurrentTrack] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [isFirstInstall, setFirstInstall] = useState(false);
  const [isStopWithApp, setStopWithApp] = useState(true);
  useEffect(() => {
    if (afterFirstLoad) {
      setAsyncStorage('favorites', favorites);
    }
  }, [favorites]);

  useEffect(() => {
    TrackPlayer.setupPlayer();
    if (isMounted.current) {
      getAsyncStorage('stopWithApp').then(data => {
        if (data !== null) {
          setStopWithApp(data);
        }
      });
      firstInstallChecker();
      loadFavorites();
      setIsFirstLoad(true);
      askPermissions().then(data => {
        if (data) {
          setTracks(data);
          refresher(data);
          createAlbums(data);
          createCleanAlbums(data);
          loadAlbumOnSetup(data);
        } else {
          loadTracksFromStorage();
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    TrackPlayer.updateOptions({
      stopWithApp: isStopWithApp,
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
  }, [isStopWithApp]);

  useEffect(() => {
    let onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async data => {
        const track = await TrackPlayer.getTrack(data.nextTrack);

        if (track != null) {
          setCurrentTrack(track.id);
        }
      },
    );

    return () => {
      onTrackChange.remove();
    };
  }, []);

  useEffect(() => {
    let queueEnded = TrackPlayer.addEventListener(
      'playback-queue-ended',
      data => {
        if (isRepeat) {
          backToStartQueue();
          ToastAndroid.show('Repeat', ToastAndroid.SHORT);
        }
      },
    );
    if (afterFirstLoad) {
      ToastAndroid.show(
        `Repeat is ${isRepeat ? 'on' : 'off'} `,
        ToastAndroid.SHORT,
      );
    }

    return () => {
      queueEnded.remove();
    };
  }, [isRepeat]);

  useEffect(() => {
    if (afterFirstLoad) {
      ToastAndroid.show(
        `Shuffle is ${isShuffled ? 'on' : 'off'}`,
        ToastAndroid.SHORT,
      );
    }
  }, [isShuffled]);

  const loadFavorites = async () => {
   const data = await getAsyncStorage('favorites')
      setFavorites(data);
  };

  const firstInstallChecker = () => {
    setTimeout(() => {
      getAsyncStorage('firstLoad').then(data => {
        setFirstInstall(data);
      });
    }, 800);
  };

  const loadTracksFromStorage = () => {
    getAsyncStorage('tracks').then(data => {
      setTracks(data);

      createAlbums(data);
      createCleanAlbums(data);
      loadAlbumOnSetup();
    });
  };

  const refresher = () => {
    return new Promise(resolve => {
      getRefresher().then(data => {
        resolve();
        if (data) {
          setTracks(data);
          createAlbums(data);
          createCleanAlbums(data);
        }
      });
    });
  };

  const createAlbums = data => {
    getFolders(data, false).then(folders => {
      setFolders(folders);
    });

    getAlbums(data, false).then(albums => {
      setAlbums(albums);
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
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
    

    const copy = arr => [...arr];
    switch (type) {
      case 'folder':
        return copy(cleanFolders[id]);
      case 'album':
        return copy(cleanAlbums[id]);
      case 'favorites':
        return favs;
      case 'all':
        return copy(tracks);
    }
  };

  const shuffleUpComingPlaylist = async shuffleState => {
    const playlist = selectPlaylist(currentAlbum[0], currentAlbum[1]);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const queue = await TrackPlayer.getQueue();

    const filterQueue = queue.filter(track => track.id !== currentTrack);

    if (isShuffled) {
      const index = playlist.reduce((a, b, i) => {
        if (b.id === currentTrack) {
          a = i;
        }
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

    storePlaylist(playlist);
  };

  const storePlaylist = playlist => {
    setCurrentPlaylist(playlist);
    setAsyncStorage('lastPlayed', playlist);
  };

  const backToStartQueue = async () => {
    const playlist = await TrackPlayer.getQueue();
    const id = playlist[0].id;
    await TrackPlayer.skip(id);
  };

  const playFromAlbums = async (id, trackToPlay, type) => {
    updatePlaylist(id, type, trackToPlay);
    let nextAlbum = id + type;
    let lastAlbum = currentAlbum.join('');
    let playlist = selectPlaylist(id, type, trackToPlay);

    if (nextAlbum === lastAlbum && !isShuffled) {
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

  const playFromSearch = async (trackId, track, tracklist) => {
    // const playlist = selectPlaylist(null, 'all', trackId);
   

    if(track) {
      await TrackPlayer.reset();
      await TrackPlayer.add(tracklist);
      await TrackPlayer.skip(trackId);
      await TrackPlayer.play();
    }
    const playlist = {
      playlist: tracklist,
      playlistType: 'none',
      playlistId: null,
    };

    storePlaylist(playlist);
    setIsShuffled(false);
   
  };

  const loadAlbumOnSetup = playlistData => {
    if (playlistData) {
      loadPlaylist(playlistData, playlistData[0].id);
    } else {
      getAsyncStorage('lastPlayed').then(data => {
        const {playlist} = data;
        getAsyncStorage('lastTrack').then(lastTrack => {
          loadPlaylist(playlist, lastTrack.id);
          setCurrentPlaylist(data);
        });
      });
    }
  };

  const loadPlaylist = async (playlist, track) => {
    if (playlist) {
      await TrackPlayer.add(playlist);
      await TrackPlayer.skip(track);
    }
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
    isLoaded: isLoaded,
    openSearch: openSearch,
    isSearching: isSearching,
    currentPlaylist: currentPlaylist,
    isFirstInstall: isFirstInstall,
    refresher: refresher,
    setStopWithApp: setStopWithApp,
    isStopWithApp: isStopWithApp,
    currentTrack: currentTrack,
    setRepeat: setRepeat,
    isRepeat: isRepeat,
    playFromSearch: playFromSearch
  };
  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  );
};

export default PlayerFunctions;
