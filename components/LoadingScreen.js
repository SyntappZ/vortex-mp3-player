import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {TracksContext} from '../context/MusicDataProvider';

const LoadingScreen = () => {

    const colorBlack = '#0D0D0D';

  return (
    <TracksContext.Consumer>
      {context => {
        const showLoader = context.showLoader;
        const loadingMessage = context.loadingMessage;
        return (
          <View></View>
        );
      }}
    </TracksContext.Consumer>
  );
};

// const styles = StyleSheet.create({
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// });

export default LoadingScreen;
