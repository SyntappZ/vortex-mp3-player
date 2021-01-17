import React from 'react';
import {View, Switch, ScrollView, StyleSheet,ToastAndroid, Text} from 'react-native';
import {PlayerContext} from '../player/PlayerFunctions';
import {setAsyncStorage, removeStorageItem} from '../data/AsyncStorage.js';
import {TouchableOpacity} from 'react-native-gesture-handler';

const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const Settings = () => {
  return (
    <PlayerContext.Consumer>
      {({isStopWithApp, setStopWithApp, setFavorites}) => {
        const changeStopWithApp = () => {
          setStopWithApp(!isStopWithApp);
          setAsyncStorage('stopWithApp', !isStopWithApp);
        };

        const deleteFavorites = async () => {
          setFavorites([])
          const message = await removeStorageItem('favorites')
          ToastAndroid.show(message, ToastAndroid.SHORT);
        };

       

        return (
          <ScrollView style={styles.container}>
            <View style={styles.preferences}>
              <Text style={styles.title}>Preferences</Text>
              <View style={styles.sectionWrap}>
                <View style={styles.textWrap}>
                  <Text style={styles.boldText}>Stop with app</Text>
                  <Text style={styles.text}>
                    Having this on will kill the player when swiped off.
                  </Text>
                </View>
                <View styles={styles.switchWrap}>
                  <Switch
                    trackColor={{false: '#333', true: colorBlue}}
                    thumbColor="white"
                    value={isStopWithApp}
                    onChange={changeStopWithApp}
                  />
                </View>
              </View>

              <View style={styles.sectionWrap}>
                <View style={styles.textWrap}>
                  <Text style={styles.boldText}>Automatic name conversion</Text>
                  <Text style={styles.text}>
                    If your mp3 file has no metadata this will convert the file
                    name into title and artist as long as your file is in this
                    format...
                  </Text>
                  <Text style={[styles.text, {paddingTop: 10}]}>
                    artist-title.mp3 or artist - title.mp3.
                  </Text>
                  <Text style={[styles.text, {paddingTop: 10}]}>
                    Then rescan.
                  </Text>
                </View>
              </View>
              <View style={styles.sectionWrap}>
                <View style={styles.textWrap}>
                  <Text style={styles.title}>Storage</Text>
                  <Text style={styles.boldText}>Delete Favorites</Text>
                </View>
              </View>
              <TouchableOpacity onPress={deleteFavorites} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <Text style={[styles.title, {paddingTop: 40}]}>About</Text>
              <View
                style={[
                  styles.sectionWrap,
                  {flexDirection: 'column', alignItems: 'flex-start'},
                ]}>
                <View style={styles.textWrap}>
                  <Text style={styles.boldText}>Version</Text>
                  <Text style={styles.text}>Vortex Player 1.0.1</Text>
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.boldText}>Made with</Text>
                  <Text style={styles.text}>React Native</Text>
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.boldText}>Developer</Text>
                  <Text style={styles.text}>{'\u00A9'} 2020 Syntappz</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      }}
    </PlayerContext.Consumer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preferences: {
    flex: 1,
    padding: 20,
  },
  sectionWrap: {
    minHeight: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: colorLightBlue,
    paddingTop: 10,
  },
  boldText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  text: {
    color: '#aaa',
    fontSize: 12,
  },
  textWrap: {
    flex: 5,
    paddingRight: 20,
    paddingVertical: 10,
  },
  switchWrap: {
    flex: 1,
    height: 150,

    backgroundColor: 'red',
  },
  button: {
    padding: 20,
    backgroundColor: colorLightBlue,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
