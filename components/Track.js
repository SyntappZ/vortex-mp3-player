import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

// import TrackPlayer from 'react-native-track-player/index';

import IonIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

class Track extends PureComponent {
 
// static onTrackChange = null
  constructor(props) {
    super(props);
   
    this.state = {
     
    
    };
  }
  


  // getCurrentTrack = async () => {
  //   const trackId = await TrackPlayer.getCurrentTrack();
  //   this.setState({currentTrack: trackId});
  // }

 


  render() {
    const {artist, title, duration, trackId, getPlaylist} = this.props

    

   

    const colorBlue = '#2A56B9';

    // console.log('current ' + this.state.currentTrack)
    //  console.log('id ' + id)
    // const trackPlaying = this.state.currentTrack == id;
    const colorLightBlack = '#131313';
    const colorLighterBlack = '#0a0a0a';

    // let bgColor = trackPlaying ? colorLighterBlack : colorLightBlack;
    // trackPlaying
    //   ? (icon = <Entypo name={'controller-play'} size={30} color={colorBlue} />)
    //   : (icon = <Entypo name={'note'} size={30} color={colorBlue} />);
    let icon = <Entypo name={'note'} size={30} color={colorBlue} />
    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>{icon}</View>

        <View style={styles.textWrap}>
          <TouchableOpacity style={styles.Touchable} onPress={() => getPlaylist(trackId)}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.author}>
              {artist}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.moreWrap}>
          <View style={styles.timeWrap}>
            <Text style={styles.trackTime}>{duration}</Text>

            <IonIcon
              style={styles.menu}
              name="md-more"
              size={30}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const colorLightBlack = '#131313';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    paddingRight: 15,
  },
  Touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textWrap: {
    flex: 4,
    justifyContent: 'center',
  },
  moreWrap: {
    flex: 2,
    justifyContent: 'center',
  },
  timeWrap: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  trackTime: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },

  menu: {},

  author: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default Track;
