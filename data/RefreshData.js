import {getTrackCoverData} from './TrackData.js';
import {setAsyncStorage} from './AsyncStorage.js';
export const getRefresher = async () => {
  return new Promise((resolve, reject) => {
    getTrackCoverData()
      .then(tracks => {
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
            artwork: track.cover,
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
        setAsyncStorage('lastPlayed', [originalTracks[0]]);
        resolve(originalTracks);
      })
      .catch(err => reject(err));
  });
};
