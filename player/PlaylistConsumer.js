import React from 'react';
import {PlayerContext} from './PlayerFunctions';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlayerContext.Consumer>
      {({isShuffled, shuffleUpComingPlaylist}) => {
        return (
          <NowPlaying
          isShuffled={isShuffled}
          shuffleUpComingPlaylist={shuffleUpComingPlaylist}
          />
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default PlaylistConsumer;
