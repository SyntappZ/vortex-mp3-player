import TrackPlayer from 'react-native-track-player';
import * as Progress from 'react-native-progress';
import React from 'react';
export default class ProgressBar extends TrackPlayer.ProgressComponent {
  render() {
    const colorBlue = '#2A56B9';
    return (
      <Progress.Bar
        progress={this.getProgress()}
        width={null}
        borderRadius={this.props.radius}
        color={colorBlue}
        height={4}
      />
    );
  }
}
