import {getAsyncStorage, setAsyncStorage} from './AsyncStorage.js';
import AsyncStorage from '@react-native-community/async-storage';

const tracks = [];

export const pushTracks = async () => {
  getAsyncStorage('tracks').then(data => {
    data.forEach(track => {
      tracks.push(track);
    });
  });
};

const isAlreadyStored = (arr, track) => {
  const ids = arr.map(track => track.id);
  return ids.includes(track.id);
};

const checkIfStorage = async (track, callback) => {
  try {
    const value = await AsyncStorage.getItem('favorites');
    if (value !== null) {
      const favorites = JSON.parse(value);
      console.log(favorites)
      console.log(typeof favorites)
      
      setAsyncStorage('favorites', favorites.concat(track));
      callback('added to favorites, amount ' + favorites.length);
    } else {
      setAsyncStorage('favorites', [track]);
      callback('added to favorites');
    }
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite = id => {
  return new Promise((resolve, reject) => {
    const selectedTrack = [];
    tracks.forEach(track => {
      if (track.item.id === id) {
        track.item.favorite = true;
        selectedTrack.push(track);
      }
    });

    checkIfStorage(selectedTrack, resolve);
  });
};

export const favoriteCheck = (id) => {
  return new Promise((resolve) => {
    getAsyncStorage('favorites').then((data) => {
      
      data.forEach(track => console.log(track.item))
      
      // resolve(idArray.includes(id))
    })
  })
}

export const removeFavorite = (id) => {
  return new Promise((resolve, reject) => {
   
    getAsyncStorage('favorites').then((data) => {
       const filterArray = data.filter(track => track.item.id === id) 
       setAsyncStorage('favorites', filterArray)
       resolve('removed from favorites, amount ' + filterArray.length)
    })
  });
}
