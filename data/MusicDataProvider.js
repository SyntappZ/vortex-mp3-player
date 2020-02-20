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
        favorite: false,
        title: track.title ? track.title : track.fileName.replace(/.mp3/, ''),
      }));

     
      setAsyncStorage(
        'tracks',
        originalTracks
      );
      setAsyncStorage('lastPlayed', [originalTracks[0]]);
      callback(originalTracks)
    })
    .catch(error => {
      console.log(error);
    });
};
