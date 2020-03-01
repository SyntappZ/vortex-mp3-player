import React from 'react';

import {PlayerContext} from './PlayerFunctions';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlayerContext.Consumer>
      {({isShuffled, shuffleUpComingPlaylist, favorites, isRepeat, setFavorites, setRepeat}) => {
        return (
          <NowPlaying
            isShuffled={isShuffled}
            shuffleUpComingPlaylist={shuffleUpComingPlaylist}
            setFavorites={setFavorites}
            favorites={favorites}
            setRepeat={setRepeat}
            isRepeat={isRepeat}
          />
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default PlaylistConsumer;
