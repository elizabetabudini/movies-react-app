import AsyncStorage from '@react-native-community/async-storage';

export const isSaved = async (item, collectionName) => {

};

/**
 * Add a given item to the collection in storage
 * @param item The item to be saved
 * @param collectionName Specify movies or locations collections
 * @returns {Promise<void>}
 */
export const addItem = async (item, collectionName) => {
  try {
    //if the item passed is the first to be saved for that collection
    //we need to create a new key for the array
    const existingItems = (await AsyncStorage.getItem(collectionName)) || '[]';
    let itemList = JSON.parse(existingItems);

    //adding the new item to the list
    itemList.push(item);

    //creating or updating the list
    await AsyncStorage.setItem(collectionName, JSON.stringify(itemList))
      .then(() => {
        console.log('It was saved successfully in collection:', collectionName);
      })
      .catch(() => {
        console.log(
          'There was an error saving the item in collection:',
          collectionName,
        );
      });
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = async (item, collectionName) => {
  try {
    //get the collection from storage
    const existingItems = await AsyncStorage.getItem(collectionName);

    //parse the collection info an array
    let itemList = JSON.parse(existingItems);

    //get the index of the item in the list
    let index = itemList.indexOf(item);

    //remove the item from the list
    itemList.splice(index, 1);

    //updating the collection
    await AsyncStorage.setItem(collectionName, JSON.stringify(itemList))
      .then(() => {
        console.log(
          'It was removed successfully from collection:',
          collectionName,
        );
      })
      .catch(() => {
        console.log(
          'There was an error removing the item from collection:',
          collectionName,
        );
      });
  } catch (error) {
    console.log(error);
  }
};
