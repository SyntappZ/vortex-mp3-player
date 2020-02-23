import React, {Component, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const Scrollable = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrap}>
      <Text style={styles.text}></Text>
      </View>
      <View style={styles.tracksScroll}></View>
     
    </View>
  );
};

export default class Sheet extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const {isSheetOpen} = this.props;
    if (isSheetOpen !== prevProps.isSheetOpen) {
      this.RBSheet.open();
    }
  }

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={550}
        duration={200}
       
        animationType={'slide'}
        
        customStyles={{
          container: {
            backgroundColor: 'black',
            flex: 1
          },
          wrapper: {
            backgroundColor: "transparent"
          },
        }}>
        <Scrollable />
      </RBSheet>
    );
  }
}

const darkBlue = '#062D83';
const colorBlack = '#0D0D0D';
const colorLightBlack = '#131313';
const colorDarkGrey = '#222';
const colorBlue = '#2A56B9';
const colorLightBlue = '#0B64D9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    
   
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  titleWrap: {
    flex: 1,
  },
  tracksScroll: {
    flex: 4
  }
});
