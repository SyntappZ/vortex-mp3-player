/**
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import NavContainer from './navigation/NavContainer';
import PlayerFunctions from './player/PlayerFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import {setAsyncStorage} from './data/AsyncStorage.js';

import {View, Text} from 'react-native';

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const App = () => {
useEffect(() => {
  firstLoad()
}, [])

const firstLoad = async () => {
  try {
    const value = await AsyncStorage.getItem('firstLoad');
  
    if (value == null) {
    
      setAsyncStorage('firstLoad', true)
    }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <PlayerFunctions>
      <NavContainer />
    </PlayerFunctions>
  );
};

export default App;
