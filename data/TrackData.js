import MusicFiles from 'react-native-get-music-files';

export const getTrackData = () => {
  return new Promise((resolve, reject) => {

    MusicFiles.getAll({
      id: true,
      blured: false,
      artist: true,
      duration: true,
      title: true,
      cover: false,
      genre: false,
      album: true,
      minimumSongDuration: 10000,
    })
    .then(tracks => {
     console.log(tracks)
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

export const getTrackCoverData = () => {
  return new Promise((resolve, reject) => {

    MusicFiles.getAll({
      id: true,
      blured: false,
      artist: true,
      duration: true,
      title: true,
      cover: true,
      genre: true,
      album: true,
      minimumSongDuration: 10000,
    })
    .then(tracks => {
     console.log(tracks)
      tracks.forEach(track => {
        const folder = track.path.split("/").reverse()[1];
        track.folder = folder
      })
      resolve(tracks)
      
    }).catch(error => {
      reject(error);
    });
  });
};
