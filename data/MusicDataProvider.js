import {getTrackData} from './TrackData.js';
import {PermissionsAndroid} from 'react-native';
import {setAsyncStorage} from './AsyncStorage.js';
import AsyncStorage from '@react-native-community/async-storage';

const checkIfStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('tracks');
    if (value == null) {
      console.log('first time loading');
      firstTimeloadTracks();
    }
  } catch (error) {
    console.log(error);
  }
};

const createFolders = async array => {
  const prop = 'folder';

  const folders = await array.reduce((a, b) => {
    if (!a[b[prop]]) {
      a[b[prop]] = [];
    }
    a[b[prop]].push(b);
    return a;
  }, {});

  const convertToArray = Object.entries(folders);

  const folderArray = convertToArray.map((album, index) => {
    return {
      id: index.toString(),
      name: album[0],
      data: album[1],
      tracksAmount: album[1].length,
    };
  });
  setAsyncStorage('folders', folderArray);
  console.log('folders loaded');
};

const createAlbums = async array => {
  array = array.filter(track => track.album !== null);
  const prop = 'album';
  const albums = await array.reduce((a, b) => {
    if (!a[b[prop]]) {
      a[b[prop]] = [];
    }
    a[b[prop]].push(b);

    return a;
  }, {});

  const convertToArray = Object.entries(albums);

  const albumArray = convertToArray.map((album, index) => {
    return {
      id: index.toString(),
      name: album[0],
      data: album[1],
      artwork: album[1][0].artwork,
      tracksAmount: album[1].length
    };
  });

  setAsyncStorage('albums', albumArray);
};

export const getPermissions = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

    {
      title: 'Permission',
      message: 'Storage access is requiered',
      buttonPositive: 'OK',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('storage granted');
    checkIfStorage();
  } else {
    console.log('storage denied');
  }
};

const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const firstTimeloadTracks = async () => {
  getTrackData()
    .then(tracks => {
      const convertTracks = tracks.map((track, index) => ({
        type: 'NORMAL',
        item: {
          flatlistId: index.toString(),
          album: track.album,
          artist: track.author ? track.author : 'Unknown',
          artwork: track.cover,
          duration: durationConverter(track.duration),
          fileName: track.fileName,
          folder: track.folder,
          id: track.id,
          url: track.cover,
          title: track.title ? track.title : track.fileName.replace(/.mp3/, ''),
        }
       
      }));
      const originalTracks = tracks.map((track, index) => ({
        flatlistId: index.toString(),
        album: track.album,
        artist: track.author ? track.author : 'Unknown',
        artwork: track.cover,
        duration: durationConverter(track.duration),
        fileName: track.fileName,
        folder: track.folder,
        id: track.id,
        url: track.cover,
        title: track.title ? track.title : track.fileName.replace(/.mp3/, ''),
      }));

      createFolders(originalTracks);
      createAlbums(originalTracks);
      setAsyncStorage('tracks', convertTracks);
      setAsyncStorage('playlist', convertTracks);
    })
    .catch(error => {
      console.log(error);
    });
};
