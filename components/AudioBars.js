import React from 'react';
import LottieView from 'lottie-react-native';

export default class AudioBars extends React.Component {
  render() {
    return <LottieView imageAssetsFolder={'lottie/audioBars'} source={require('../android/app/src/main/assets/lottie/audioBars/audioBars.json')} autoPlay loop />;
  }
}