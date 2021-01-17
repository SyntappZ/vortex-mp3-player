import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Album = ({
  albumName,
  artwork,
  albumId,
  openModal,
  tracksAmount,
  isFirstInstall,
}) => {
  const [albumArt, setAlbumArt] = useState(
    <IonIcon name="md-disc" size={130} color="#666" />,
  );
  const modalHandler = () => openModal(albumId);

  useEffect(() => {
    // const loader = <ActivityIndicator size="large" color="#555" />;
    const image = <Image style={styles.image} source={{uri: artwork}} />;
    const defaultImage = <IonIcon name="md-disc" size={130} color="#666" />
    if (artwork) {
      setAlbumArt(image);
    
    } else {
      setAlbumArt(defaultImage);
    }
  }, [artwork]);

  return (
    <View style={styles.album}>
      <View style={styles.imageWrap}>
        <TouchableOpacity style={styles.touchable} onPress={modalHandler}>
          {albumArt}
        </TouchableOpacity>
      </View>
      <View style={styles.albumInfo}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{color: 'white'}} numberOfLines={1}>
            {albumName}
          </Text>
          <Text style={{color: '#D3D3D3'}} numberOfLines={1}>
            songs: {tracksAmount}
          </Text>
        </View>

        <View style={styles.more}>
          <IonIcon name="md-more" size={30} color="#fff" />
        </View>
      </View>
    </View>
  );
};



const colorDarkGrey = '#222';
const colorBlue = '#2A56B9';

const styles = StyleSheet.create({
  album: {
    width: '100%',
    height: 200,
  },
  imageWrap: {
    flex: 5,
    backgroundColor: colorDarkGrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '100%',
  },
  more: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  albumInfo: {
    flex: 2,
    backgroundColor: colorBlue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    flexDirection: 'row',
  },
});

export default Album;
