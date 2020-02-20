import React from 'react';
import {PlayerContext} from './PlayerFunctions';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlayerContext.Consumer>
      {({isShuffled, shuffleUpComingPlaylist, renderFavoritesScreen}) => {
        return (
          <NowPlaying
          isShuffled={isShuffled}
          shuffleUpComingPlaylist={shuffleUpComingPlaylist}
          renderFavoritesScreen={renderFavoritesScreen}
          />
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default PlaylistConsumer;
