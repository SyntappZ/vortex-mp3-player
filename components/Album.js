import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Text,
} from 'react-native';



import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


class Album extends PureComponent {
  constructor(props) {
    super(props);
    // const {getAlbum} = this.props;
    this.state = {};
  }

  // convertImage = async file => {
  //   await ImgToBase64.getBase64String(file)
  //     .then(base64String => {
  //       if (this._isMounted) {
  //         this.setState({
  //           albumImage: `data:image/jpg;base64, ${base64String} `,
  //         });
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  // componentDidMount() {
  //   this._isMounted = true;
  //   const {album} = this.props;
  //   const image = album[0].cover;
  //   if (image) {
  //     this.convertImage(image);
  //   }
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // getAlbum = () => {
  //   const {albumName, image, modalHandler} = this.props;
  //   modalHandler({
  //     albumImage: image,

  //     albumName: albumName,
  //   });
  // };

  render() {
    const {albumName, artwork} = this.props;

    
     const songsInAlbum = 3
    const myIcon = <Icon name="rocket" size={30} color="#900" />;
    const defaultImage = <IonIcon name="md-disc" size={130} color="#666" />;
    const albumArt = <Image style={styles.image} source={{uri: artwork}} />;

    return (
      <View style={{width: '50%'}}>
        <View style={styles.album}>
          <View style={styles.imageWrap}>
            <TouchableNativeFeedback
              style={styles.touchable}
              onPress={this.getAlbum}>
              {artwork ? albumArt : defaultImage}
            </TouchableNativeFeedback>
          </View>
          <View style={styles.albumInfo}>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text style={{color: 'white'}} numberOfLines={1}>
                {albumName}
              </Text>
              <Text style={{color: '#D3D3D3'}} numberOfLines={1}>
                songs: {songsInAlbum}
              </Text>
            </View>

            <View style={styles.more}>
              <IonIcon name="md-more" size={30} color="#fff" />
            </View>
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
    margin: 7,
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
