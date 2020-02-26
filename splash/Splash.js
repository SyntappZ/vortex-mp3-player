import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StatusBar, Image, StyleSheet} from 'react-native';
import {PlayerContext} from '../player/PlayerFunctions';
import {getAsyncStorage} from '../data/AsyncStorage.js'

export default class Splash extends Component {
  static contextType = PlayerContext;
  constructor(props) {
    super(props);

    this.state = {
       
    }
  }

  componentDidMount() {
   
  }

  loadMainPage = () => {
    this.props.navigation.navigate('Main');
  };

  render() {
    const {isLoaded, isFirstInstall} = this.context;
 
    isLoaded ? this.loadMainPage() : null;
    console.log('is first on splash ' + isFirstInstall)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colorBlack} animated={true} />

        <View style={styles.welcome}>
          <View style={styles.wrap}>
            <Image
              style={styles.image}
              source={require('../images/dark-headphones.png')}
            />
            <Text style={styles.largeText}>vortex player</Text>
            <Text style={styles.smallText}>Free Music App</Text>
          </View>
        </View>
        <View style={styles.message}>
         {isFirstInstall ? <FirstInstallMessage /> : null}   
        </View>
      </View>
    );
  }
}

const FirstInstallMessage = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.textWrap}>
        <Text style={styles.installText}>
          It takes a little while longer to load on first installation.
        </Text>
        <Text style={styles.installText}>Thank you for your patience!</Text>
      </View>
      <View style={styles.loader}>
      <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorBlue = '#074DD9';
const colorLightBlue = '#0B64D9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBlack,
  },
  welcome: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  largeText: {
    fontSize: 30,
    fontFamily: 'Gugi-Regular',
    color: 'white',
    textAlign: 'center',
  },
  smallText: {
    color: '#555',
    letterSpacing: 1,
    paddingTop: 5,
    textAlign: 'center',
  },
  installText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 5,
  },
  textWrap: {
      paddingHorizontal: 60,
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
  },
  loader: {
      flex: 1
  }
});
