/**
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import NavContainer from './navigation/NavContainer';
import PlayerFunctions from './player/PlayerFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import {setAsyncStorage} from './data/AsyncStorage.js';

const App = () => {
useEffect(() => {
  firstLoad()
}, [])

  const firstLoad = async () => {
  try {
    const value = await AsyncStorage.getItem('firstLoad');
    if (value == null) {
        setAsyncStorage('firstLoad', true);
    }
  } catch (error) {
    alert(error)
  }
}
  return (
    <PlayerFunctions>
      <NavContainer />
    </PlayerFunctions>
  );
};

export default App;
