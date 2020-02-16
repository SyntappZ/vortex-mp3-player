import React from 'react';
import {PlaylistContext} from '../context/PlaylistProvider';
import NowPlaying from './NowPlaying';

const PlaylistConsumer = () => {
  return (
    <PlaylistContext.Consumer>
      {({playlist, trackToPlay}) => {
        return (
          <NowPlaying
            playlist={playlist}
            trackToPlay={trackToPlay}
           
          />
        );
      }}
    </PlaylistContext.Consumer>
  );
};

export default PlaylistConsumer;
