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
      id: index,
      name: album[0],
      data: album[1],
      trackAmount: album[1].length
    };
  });
  setAsyncStorage('folders', folderArray);
  console.log('folders loaded')

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
      id: index,
      name: album[0],
      data: album[1],
      image: album[1][0].cover,
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

const firstTimeloadTracks = async () => {
  getTrackData()
    .then(tracks => {
      createFolders(tracks);
      createAlbums(tracks);
      setAsyncStorage('tracks', tracks);
      setAsyncStorage('playlist', tracks);
    })
    .catch(error => {
      console.log(error);
    });
};
