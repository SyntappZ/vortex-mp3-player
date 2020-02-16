import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {FlatList, View} from 'react-native';
import {TracksContext} from '../context/MusicDataProvider';
import Track from '../components/Track';

const SongsScreen = () => {
  const [tracks, setTracks] = useState([]);

  const loadTracksFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('tracks');

      if (value !== null) {
        const parseTracks = JSON.parse(value);

        setTracks(parseTracks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => <Track track={item} playlist={tracks} />;

  useEffect(() => {
    loadTracksFromStorage();
  }, []);
  const colorBlue = '#074DD9';
  return (<View></View>
   
          // <FlatList
          //   data={tracks}
          //   removeClippedSubviews={true}
          //   contentContainerStyle={{paddingBottom: 80}}
          //   renderItem={renderItem}
          //   getItemLayout={(data, index) => ({
          //     length: 70,
          //     offset: 70 * index,
          //     index,
          //   })}
          //   initialNumToRender={5}
          //   maxToRenderPerBatch={10}
          //   windowSize={10}
          //   keyExtractor={(item, index) => index.toString()}
          // />
      
  );
};

export default SongsScreen;
