import AsyncStorage from '@react-native-community/async-storage';


  export const GetAsyncStorage = (storageName) => {
    return new Promise((resolve, reject) => {
          try {
            const value = AsyncStorage.getItem(storageName);
            if (value == null) {
              const storage = JSON.parse(value)
              resolve(storage)
            }
          } catch (error) {
            reject(error)
          }
    })
  }
  
  export const SetAsyncStorage = async (storageName, data) => {
   
    try {
        await AsyncStorage.setItem(storageName, JSON.stringify(data))
      } catch (error) {
       console.log(error)
      }
    
  }