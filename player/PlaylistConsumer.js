import React from 'react';
import {PlaylistContext} from '../context/PlaylistProvider';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlaylistContext.Consumer>
      {({playlist, trackToPlay, currentAlbum}) => {
        return (
          <NowPlaying
            playlist={playlist}
            trackToPlay={trackToPlay}
            currentAlbum={currentAlbum}
          />
        );
      }}
    </PlaylistContext.Consumer>
  );
};

export default PlaylistConsumer;
