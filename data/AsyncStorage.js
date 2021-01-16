import AsyncStorage from '@react-native-community/async-storage';

const getAsyncStorage = storageName => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(storageName);

      if (value !== null) {
        const storage = JSON.parse(value);

        resolve(storage);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const setAsyncStorage = async (storageName, data) => {
  try {
    await AsyncStorage.setItem(storageName, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const removeStorageItem = async storageName => {
  try {
    await AsyncStorage.removeItem(storageName);
    return `${storageName} removed`;
  } catch (e) {
    return e;
  }
};

const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear()
    return 'Storage cleared!'
  } catch(e) {
    return e
  }

 
}

export {getAsyncStorage, removeStorageItem, setAsyncStorage, clearAllStorage};
