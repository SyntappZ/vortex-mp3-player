import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {fetchAlbumArt} from '../data/AlbumArtApi.js';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

class Album extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: ''
    }
  }
  modalHandler = () => {
    const {albumId, openModal} = this.props;
    openModal(albumId);
  };

  

  render() {
    const {albumName, artwork, tracksAmount} = this.props;

    const myIcon = <Icon name="rocket" size={30} color="#900" />;
    const defaultImage = <IonIcon name="md-disc" size={130} color="#666" />;
    const albumArt = <Image style={styles.image} source={{uri: artwork}} />;

    return (
      <View style={styles.album}>
        <View style={styles.imageWrap}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.modalHandler}>
            {artwork ? albumArt : defaultImage}
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
  }
}

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
