const apiKey = 'a14ddda0b899a9c8d0720b8cba69acdd';

export const fetchLyrics = (track, artist) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&q_track=dakota&q_artist=stereophonics&apikey=a14ddda0b899a9c8d0720b8cba69acdd`,
    )
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        resolve(myJson.message.body.lyrics);
      })
      .catch(err => reject(err));
  });
};
