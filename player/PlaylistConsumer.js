import React from 'react';
import Searchbar from "../components/Searchbar";
import { View } from 'react-native'
import {PlayerContext} from './PlayerFunctions';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlayerContext.Consumer>
      {({
        isShuffled,
        shuffleUpComingPlaylist,
        favorites,
        setFavorites,
        isSearching,
      }) => {
        return (
          <View>
            {isSearching ? (
              <Searchbar />
            ) : (
              <NowPlaying
                isShuffled={isShuffled}
                shuffleUpComingPlaylist={shuffleUpComingPlaylist}
                setFavorites={setFavorites}
                favorites={favorites}
              />
            )}
          </View>
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default PlaylistConsumer;
