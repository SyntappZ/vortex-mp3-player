// const apiKey = '13a3b938fec73f7f4400a980a36e692a';

// const fetchAlbumArt = async (artist, album) => {

//   try {
//     const response = await fetch(
//       `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artist}&album=${album}&format=json`,
//     );
//     const data = await response.json();
//     console.log(data.error)
//     // const image = data.album.image[2]['#text']
//     let image = ''
//      if(image) {
//        return image
//      }else{
//        return ''
//      }
  
    
//   }catch(error) {
//     console.log(error)
//   }
 
// };

// export {fetchAlbumArt};
