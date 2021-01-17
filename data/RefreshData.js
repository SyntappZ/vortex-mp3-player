import {getTrackCoverData} from './TrackData.js';
import {setAsyncStorage} from './AsyncStorage.js';
import RNFS from 'react-native-fs';

const moveImageToFolder = async cover => {
  try {
    if (cover) {
      const target = cover.replace('emulated/0/', 'emulated/0/albumArt/');
      await RNFS.moveFile(cover, target);
    }
    return 'moved';
  } catch (error) {
    console.log(error);
    return null;
  }
};

const moveImageRecursion = async (data, folderImageList, results = []) => {
  if (data.length < 1) return results;
  const art = data[0].cover;
  const cover = art ? art.replace('file://', '') : '';
  if (!folderImageList.includes(cover)) {
    await moveImageToFolder(cover);
  }

  const track = data.shift();
  results.push(track);
  return moveImageRecursion(data, folderImageList, results);
};

const getRefresher = async () => {
  setAsyncStorage('firstLoad', false);

  const checkFolder = await RNFS.readDir('/storage/emulated/0/albumArt');
  const folderImageList = checkFolder.map(item => item.path);

  const tracks = await getTrackCoverData();

  const newTracks = await moveImageRecursion(tracks, folderImageList);
  console.log('done recursion');
  console.log(newTracks.length);
  const nameConverter = str => {
    str = str.replace('.mp3', '');
    let arr = str.split('-');
    return arr.length === 2 ? arr : null;
  };

  const durationConverter = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const secondsConverter = millis => (millis / 1000).toFixed(1);

  const originalTracks = newTracks.map((track, index) => {
    let title = '';
    let artist = '';

    if (!track.author) {
      if (nameConverter(track.fileName)) {
        title = nameConverter(track.fileName)[1].trim();
        artist = nameConverter(track.fileName)[0].trim();
      }
    }

    const artwork = track.cover
      ? track.cover.replace('emulated/0/', 'emulated/0/albumArt/')
      : '';

    return {
      index: index,
      album: track.album,
      artist: artist ? artist : track.author ? track.author : 'Unknown',
      artwork: artwork,
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
  console.log('map done');
  setAsyncStorage('tracks', originalTracks);
  setAsyncStorage('lastPlayed', [originalTracks[0]]);
  return originalTracks;
};

export {getRefresher};
