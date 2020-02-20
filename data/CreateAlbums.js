//  createFolders(originalTracks);
//  createAlbums(originalTracks);

export const getFolders = (tracks, isClean) => {
  return new Promise(resolve => {
    createFolders(tracks, isClean, resolve);
  });
};
export const getAlbums = (tracks, isClean) => {
  return new Promise(resolve => {
    createAlbums(tracks, isClean, resolve);
  });
};

const listViewConvertor = arr =>
  arr.map(data => ({
    type: 'NORMAL',
    item: data,
  }));

const createFolders = async (array, isClean, callback) => {
  const prop = 'folder';

  const folders = await array.reduce((a, b) => {
    if (!a[b[prop]]) {
      a[b[prop]] = [];
    }
    a[b[prop]].push(b);
    return a;
  }, {});

  const convertToArray = Object.entries(folders);

  const folderArray = convertToArray.map((folder, index) => {
    return isClean
      ? folder[1]
      : {
          type: 'NORMAL',
          item: {
            folderId: index.toString(),
            name: folder[0],
            data: listViewConvertor(folder[1]),
            tracksAmount: folder[1].length,
          },
        };
  });

  callback(folderArray);
};

const createAlbums = async (array, isClean, callback) => {
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
    return isClean
      ? album[1]
      : {
          type: 'NORMAL',
          item: {
            albumId: index.toString(),
            name: album[0],
            data: listViewConvertor(album[1]),
            artwork: album[1][0].artwork,
            tracksAmount: album[1].length,
          },
        };
  });

  callback(albumArray);
};
