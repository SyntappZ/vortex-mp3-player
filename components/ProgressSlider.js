import TrackPlayer from 'react-native-track-player';
// import * as Progress from 'react-native-progress';
import React from 'react';

import {View, Slider} from 'react-native';

export default class ProgressSlider extends TrackPlayer.ProgressComponent {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
        };
      }

      
      change(value) {
          this.setState({value: value})
        // this.setState(() => {
        //   return {
        //     value: parseFloat(value),
        //   };
        // });
        // console.log(value)
      }
  render() {
    const darkBlue = '#062D83';
    const {value} = this.state;
    const colorBlue = '#2A56B9';
    const val = this.getProgress()
    return (
      <View>
        <Slider
          
          maximumValue={1}
          minimumValue={0}
          thumbTintColor={'white'}
          minimumTrackTintColor={darkBlue}
          maximumTrackTintColor="#555"
        //   onValueChange={this.change(this.getProgress())}
          value={val}
        />
      </View>
    );
  }
}
