/**
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import NavContainer from './navigation/NavContainer';
import PlayerFunctions from './player/PlayerFunctions';
import {fetchAlbumArt} from './data/AlbumArtApi.js';
import PlaylistConsumer from './player/PlaylistConsumer';
import SideMenu from 'react-native-side-menu';
import {View, Text} from 'react-native';

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const App = () => {
  useEffect(() => {
   
    
    
  }, []);

  return (
    <PlayerFunctions>
      <NavContainer />
    </PlayerFunctions>
  );
};

export default App;
