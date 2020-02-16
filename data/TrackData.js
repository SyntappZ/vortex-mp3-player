import RNAndroidAudioStore from 'react-native-get-music-files';

export const getTrackData = () => {
  return new Promise((resolve, reject) => {

    RNAndroidAudioStore.getAll({
      id: true,
      blured: false,
      artist: true,
      duration: true,
      title: true,
      cover: true,
      genre: true,
      album: true,
      icon: false,
      minimumSongDuration: 10000,
    })
    .then(tracks => {
     
      tracks.forEach(track => {
        const folder = track.path.split("/").reverse()[1];
        track.folder = folder
      })
      
      resolve(tracks);
    }).catch(error => {
      reject(error);
    });
  });
};
