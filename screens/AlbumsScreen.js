import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

 import { getAsyncStorage } from '../data/AsyncStorage.js'
const AlbumsScreen = () => {
  


useEffect(() => {
  console.log('get data')
  getAsyncStorage('folders').then((data) => {
    console.log(data)
  })
}, []) 

  return <View style={styles.container}>
    <Text style={styles.text}>hello this is albums</Text>
  </View>;
};

const colorLightBlack = '#131313';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorLightBlack,
  },
  text: {
    color: 'white'
  }
});

export default AlbumsScreen;
