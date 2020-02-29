import React, {Component} from 'react';
import {View} from 'react-native';

export default class Gradient extends Component {
  render() {
    const darkBlue = '#062D83';
    const gradientHeight = 370;
    const gradientBackground = darkBlue;
    const data = Array.from({length: gradientHeight});
    return (
      <View style={{flex: 1}}>
        {data.map((_, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              backgroundColor: gradientBackground,
              height: 1,
              top: gradientHeight - 1 - i,

              right: 0,
              left: 0,
              zIndex: 2,
              opacity: (1 / gradientHeight) * (i + 1),
            }}
          />
        ))}
      </View>
    );
  }
}
