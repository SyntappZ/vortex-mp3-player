const apiKey = '13a3b938fec73f7f4400a980a36e692a';

export const fetchAlbumArt = name => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&limit=1&api_key=${apiKey}&format=json`,
    )
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        const image = myJson.results.albummatches.album[0].image[2]['#text'];

        resolve(image);
      })
      .catch(err => reject(err));
  });
};
