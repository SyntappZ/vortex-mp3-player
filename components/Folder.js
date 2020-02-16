import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';


import IonIcon from 'react-native-vector-icons/Ionicons';

import EntypoIcon from 'react-native-vector-icons/Entypo';

class Folder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // openModal = () => {
  //   const {folderName, tracks, getFolder} = this.props;
  //   getFolder({folderName: folderName, tracks: tracks});
  // };

  render() {
    const {folderName, trackAmount, id} = this.props;

    const folderIcon = (
      <EntypoIcon name={'folder-music'} size={35} color="#074DD9" />
    );
   

    const test = () => {
      console.log('oh baby it works');
    };

    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>{folderIcon}</View>
        <View style={styles.textWrap}>
          <TouchableOpacity style={styles.touchable} onPress={this.openModal}>
            <Text numberOfLines={1} style={styles.title}>
              {folderName}
            </Text>
            <Text numberOfLines={1} style={styles.storage}>
              /sd card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.moreWrap}>
          <TouchableOpacity style={styles.moreTouchable} onPress={() => test()}>
            <Text numberOfLines={1} style={styles.songs}>
              songs: {trackAmount}
            </Text>
            <IonIcon name="md-more" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const colorLightBlack = '#131313';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorLightBlack,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  iconWrap: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
  textWrap: {
    flex: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  moreTouchable: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  moreWrap: {
    flex: 2,
  },

  songs: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    paddingRight: 15,
  },
  storage: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 2,
  },
});

export default Folder;
