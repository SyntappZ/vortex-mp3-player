

import {getTrackData} from './TrackData.js';
import {PermissionsAndroid} from 'react-native';
import {SetAsyncStorage} from './AsyncStorage.js';
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
console.log('folders created')
  return folders
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
  console.log('albums created')
  return convertToArray.map((album, index) => {
    return {
      id: index,
      name: album[0],
      data: album[1],
      image: album[1][0].cover,
    };
  });
  
};

const getPermissions = async () => {
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

const firstTimeloadTracks = async () => {
  getTrackData()
    .then(tracks => {
     const folders = createFolders(tracks);
     const albums = createAlbums(tracks);
      SetAsyncStorage('tracks', tracks);
      SetAsyncStorage('playlist', tracks);
      SetAsyncStorage('folders', folders);
      SetAsyncStorage('albums', albums);
    })
    .catch(error => {
      console.log(error);
    });
};

export const MusicDataProvider = () => getPermissions();
