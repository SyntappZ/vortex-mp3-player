import TrackPlayer from 'react-native-track-player';
import React from 'react';
import {View, Slider} from 'react-native';

export default class ProgressSlider extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
  }

  mapNumber = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  changeSliderPos = value => {
    const {seconds} = this.props;
    const skipTo = this.mapNumber(value, 0, 1, 0, seconds);
    TrackPlayer.seekTo(skipTo);
  };

  render() {
    const darkBlue = '#062D83';

    return (
      <View>
        <Slider
          onSlidingComplete={this.changeSliderPos}
          maximumValue={1}
          minimumValue={0}
          thumbTintColor={'white'}
          minimumTrackTintColor={darkBlue}
          maximumTrackTintColor="#aaa"
          value={this.getProgress()}
        />
      </View>
    );
  }
}
