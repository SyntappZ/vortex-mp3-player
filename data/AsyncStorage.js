import AsyncStorage from '@react-native-community/async-storage';


  export const getAsyncStorage = (storageName) => {
    console.log('getting storage')
    return new Promise(async (resolve, reject) => {
          try {
            const value = await AsyncStorage.getItem(storageName);
           
            if (value !== null) {
              const storage = JSON.parse(value)
              console.log('getting storage jeff')
              resolve(storage)
            }
          } catch (error) {
            reject(error)
          }
    })
  }
  
  export const setAsyncStorage = async (storageName, data) => {
   
    try {
        await AsyncStorage.setItem(storageName, JSON.stringify(data))
      } catch (error) {
       console.log(error)
      }
    
  }