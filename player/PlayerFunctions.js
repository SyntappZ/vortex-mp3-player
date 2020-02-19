import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import {askPermissions} from '../data/MusicDataProvider.js';
import TrackPlayer from 'react-native-track-player/index';
import Track from '../components/Track.js';
export const PlayerContext = createContext();

const PlayerFunctions = ({children}) => {
  let [tracks, setTracks] = useState([]);
  let [folders, setFolders] = useState([]);
  let [albums, setAlbums] = useState([]);
  const playbackState = TrackPlayer.usePlaybackState();
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState([])
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  useEffect(() => {
    loadTracksFromStorage();

    askPermissions().then(isFirst => {
      if (isFirst) {
        setIsFirstLoad(isFirst);
      }
    });
  }, []);

  const oneTimeShuffle = async (id, type) => {
    setCurrentAlbum([id, type])
    const playlist = selectPlaylist(id, type);
    await TrackPlayer.reset();
    await TrackPlayer.add(shuffle(playlist))
    await TrackPlayer.play()
    setIsShuffled(true)
  };
  const selectPlaylist = (id, type) => {
    const copy = arr => [...arr];
    switch (type) {
      case 'folder':
        return copy(folders[id]);
      case 'album':
        return copy(albums[id]);
      case 'all':
        return copy(tracks);
    }
  };

  const shuffleUpComingPlaylist = async (shuffleState) => {
   const playlist = selectPlaylist(currentAlbum[0], currentAlbum[1]);

    const currentTrack = await TrackPlayer.getCurrentTrack();
    
    const queue = await TrackPlayer.getQueue();
    
    let filterQueue = queue.filter(track => track.id !== currentTrack);
   
   

    if (isShuffled) {
      console.log('not shuffling...');
      let index = playlist.reduce((a, b, i) => {
        if (b.id === currentTrack) a = i;
        return a;
      });
      const newPlaylist = playlist.filter(
        track => playlist.indexOf(track) > index,
      );


      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(newPlaylist);
    } else {
      console.log('shuffling...');

      const shuffledPlaylist = shuffle(filterQueue);
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(shuffledPlaylist);
    }

    if (playbackState === TrackPlayer.STATE_STOPPED) {
      await TrackPlayer.play();
    }
    setIsShuffled(shuffleState)
  };

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

  // const playlistShuffler = (id, type) => {

  // };

  // const playlistDeployer = (playlist, track, playing) => {

  // };

  // const playlistRetriever = (id, trackId, type) => {

  // };
  const playlistFromTracks = async (id, trackToPlay, type) => {
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    setCurrentAlbum([id, type])
    const playlist = selectPlaylist(id, type);

    if (playlist) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlist);
    }

    if (trackToPlay) {
      await TrackPlayer.skip(trackToPlay);
    }

    await TrackPlayer.play();
    setIsShuffled(false)

  };

  const data = {
    shuffleUpComingPlaylist: shuffleUpComingPlaylist,
    isFirstLoad: isFirstLoad,
    playlistFromTracks: playlistFromTracks,
    oneTimeShuffle: oneTimeShuffle,
    isShuffled: isShuffled
  };
  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  );
};

export default PlayerFunctions;
