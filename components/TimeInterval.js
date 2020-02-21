import TrackPlayer from 'react-native-track-player';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TimeInterval extends TrackPlayer.ProgressComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: '0:00',
    };
  }

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

  render() {
    this.getPos();
    const {time} = this.state;
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
