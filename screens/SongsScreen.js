
import React, { Component } from 'react'

import {View, StyleSheet, FlatList} from 'react-native';
import {getAsyncStorage} from '../data/AsyncStorage.js';
import Track from '../components/Track'

export default class SongsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tracks: []
    }
  }
  componentDidMount() {
    getAsyncStorage('tracks').then((data) => {
      
      this.setState({tracks: data})
     })
     
  }

  renderItem = ({item}) => <Track artist={item.artist} duration={item.duration} id={item.id} title={item.title} />;
  render() {
    const { tracks } = this.state
    return (
      <View style={styles.container}>
      {/* <FlatList
        data={tracks}
        removeClippedSubviews={true}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={this.renderItem}
        keyExtractor={item => item.flatListId}
      /> */}
    </View>
    )
  }
}

// const SongsScreen = () => {
// const [tracks, setTracks] = useState([])
//   useEffect(() => {
//     getAsyncStorage('tracks').then((data) => {
//      setTracks(data)
//     })
//   }, [])

//   const renderItem = ({item}) => <Track track={item} playlist={tracks} />;
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tracks}
//         removeClippedSubviews={true}
//         contentContainerStyle={{paddingBottom: 80}}
//         renderItem={renderItem}
//         keyExtractor={item => item.flatListId}
//       />
//     </View>
//   );
// };

const colorLightBlack = '#131313';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorLightBlack,
  },
});


