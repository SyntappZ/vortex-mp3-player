import TrackPlayer from 'react-native-track-player';
// import * as Progress from 'react-native-progress';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export default class TimeInterval extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: '0:00',
    };
  }
  componentDidMount() {
    const time = this.state.position;
    // console.log(time);

    //    const { isPlaying } = this.props
    //     this._interval = setInterval(() => {

    //     }, 1000);
  }
  //   seekTo(seconds)

  convertTime(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  }

  currentTime = pos => {
    const removeMil = this.convertTime(pos).replace(/\.\d+/, '');
    const split = removeMil.split(':');

    return split[1] == '9' ? `${split[0]}:09` : removeMil;
  };

  getPos = async () => {
    const pos = await TrackPlayer.getPosition();

    this.setState({time: this.currentTime(pos)});
  };

  componentWillUnmount() {
    //  clearInterval(this._interval);
  }

  render() {
    // const position = this.state.position;
    // const duration = this.state.duration;
    // const secondPos = TrackPlayer.getPosition();
    this.getPos();
    const darkBlue = '#062D83';
    const {time} = this.state;
    const colorBlue = '#2A56B9';
    // const time = this.position;
    return (
      <View style={styles.startTime}>
        <Text style={styles.time}>{time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    color: '#777',
  },
});
