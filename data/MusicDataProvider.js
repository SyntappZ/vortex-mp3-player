import {getTrackData} from './TrackData.js';
import {PermissionsAndroid} from 'react-native';
import {setAsyncStorage} from './AsyncStorage.js';
import AsyncStorage from '@react-native-community/async-storage';


export const askPermissions = () => {
 return new Promise((resolve) => {
  getPermissions(resolve)
  })
}


const checkIfStorage = async (callback) => {
  try {
    const value = await AsyncStorage.getItem('tracks');
    if (value == null) {
      console.log('first time loading');
      firstTimeloadTracks(callback);
    }else{
      callback(false)
    }
  } catch (error) {
    console.log(error);
  }
};




const durationConverter = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
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
      type: 'NORMAL',
      item: {
        folderId: index.toString(),
        name: album[0],
        data: album[1].map(data => ({
          type: 'NORMAL',
          item: data,
        })),
        tracksAmount: album[1].length,
      },
    };
  });
  setAsyncStorage('folders', folderArray);
  
  
};

const createAlbums = async (array, callback) => {
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
      type: 'NORMAL',
      item: {
        albumId: index.toString(),
        name: album[0],
        data: album[1].map(data => ({
          type: 'NORMAL',
          item: data,
        })),
        artwork: album[1][0].artwork,
        tracksAmount: album[1].length,
      },
    };
  });

 await setAsyncStorage('albums', albumArray);
 callback(true)
};

const getPermissions = async (callback) => {
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
    checkIfStorage(callback);
  } else {
    console.log('storage denied');
  }
};

const firstTimeloadTracks = async (callback) => {
  getTrackData()
    .then(tracks => {
      // const convertTracks = tracks.map((track, index) => ({
      //   type: 'NORMAL',
      //   item: {
      //     index: index,
      //     album: track.album,
      //     artist: track.author ? track.author : 'Unknown',
      //     artwork: track.cover,
      //     duration: durationConverter(track.duration),
      //     fileName: track.fileName,
      //     folder: track.folder,
      //     id: track.id,
      //     url: track.path,
      //     title: track.title ? track.title : track.fileName.replace(/.mp3/, ''),
      //   },
      // }));
      const originalTracks = tracks.map((track, index) => ({
        index: index,
        album: track.album,
        artist: track.author ? track.author : 'Unknown',
        artwork: track.cover,
        duration: durationConverter(track.duration),
        time: track.duration,
        fileName: track.fileName,
        folder: track.folder,
        id: track.id,
        url: track.path,
        title: track.title ? track.title : track.fileName.replace(/.mp3/, ''),
      }));

      createFolders(originalTracks);
      createAlbums(originalTracks, callback);
      setAsyncStorage(
        'tracks',
        originalTracks.map(track => {
          return {type: 'NORMAL', item: track};
        }),
      );
      setAsyncStorage('lastPlayed', [originalTracks[0]]);
    })
    .catch(error => {
      console.log(error);
    });
};
