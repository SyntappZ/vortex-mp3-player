import React from 'react';
import Searchbar from '../components/Searchbar';
import {View} from 'react-native';
import {PlayerContext} from './PlayerFunctions';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlayerContext.Consumer>
      {({isShuffled, shuffleUpComingPlaylist, favorites, setFavorites}) => {
        return (
          <NowPlaying
            isShuffled={isShuffled}
            shuffleUpComingPlaylist={shuffleUpComingPlaylist}
            setFavorites={setFavorites}
            favorites={favorites}
            
          />
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default PlaylistConsumer;
