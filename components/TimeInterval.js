import TrackPlayer from 'react-native-track-player';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TimeInterval extends Component {
  _isMounted = false;
  intervalID = 0;
  constructor(props) {
    super(props);
    this.state = {
      time: '0:00',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.intervalID = setInterval(() => {
        this.getPos();
      }, 500);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
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
    if (this._isMounted) {
      const pos = await TrackPlayer.getPosition();
      this.setState({time: this.currentTime(pos)});
    }
  };

  render() {
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
