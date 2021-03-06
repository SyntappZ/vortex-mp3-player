import {getTrackData} from './TrackData.js';
import {PermissionsAndroid} from 'react-native';
import {setAsyncStorage} from './AsyncStorage.js';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
export const askPermissions = () => {
  return new Promise(resolve => {
    getPermissions(resolve);
  });
};
const makeDir = async () => {
  try {
    const target = '/storage/emulated/0/albumArt/';
    const noMedia = target + '.nomedia';
    await RNFS.mkdir(target);
    await RNFS.writeFile(noMedia, '');
    return 'created';
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checkIfStorage = async callback => {
  try {
    const value = await AsyncStorage.getItem('tracks');
    if (value == null) {
      setAsyncStorage('isFirstInstall', true);
      await makeDir();
      console.log('made dirctory');
      firstTimeloadTracks(callback);
    } else {
      callback(false);
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

const secondsConverter = millis => (millis / 1000).toFixed(1);

const getPermissions = async callback => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ],
      {
        title: 'Permission',
        message: 'Storage access is requiered',
        buttonPositive: 'OK',
      },
    );

    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      checkIfStorage(callback);
    } else {
    }
  } catch (err) {
    console.warn(err);
  }
};

const nameConverter = str => {
  str = str.replace('.mp3', '');
  let arr = str.split('-');
  return arr.length === 2 ? arr : null;
};

const firstTimeloadTracks = async callback => {
  const tracks = await getTrackData();

  const originalTracks = tracks.map((track, index) => {
    let title = '';
    let artist = '';
   
    if (!track.author) {
      if (nameConverter(track.fileName)) {
        title = nameConverter(track.fileName)[1].trim();
        artist = nameConverter(track.fileName)[0].trim();
      }
    }

    return {
      index: index,
      album: track.album,
      artist: artist ? artist : track.author ? track.author : 'Unknown',
      artwork: track.artwork,
      duration: durationConverter(track.duration),
      seconds: secondsConverter(track.duration),
      millis: track.duration,
      fileName: track.fileName,
      folder: track.folder,
      id: track.id,
      url: track.path,
      favorite: false,
      title: title
        ? title
        : track.title
        ? track.title
        : track.fileName.replace(/.mp3/, ''),
    };
  });

  setAsyncStorage('tracks', originalTracks);

  callback(originalTracks);
};
