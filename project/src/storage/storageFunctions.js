import AsyncStorage from '@react-native-community/async-storage';
import {RNToasty} from 'react-native-toasty'

export const isSaved = async (item, collectionName) => {
  return true;
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
    console.log('list:', itemList);
    console.log("item:",JSON.stringify(item));

    //if the item does not exist in the storage, indexOf will return -1
    let index = itemList.indexOf(JSON.stringify(item));

    //check if item is already been saved in storage
    if (index === -1) {
      //adding the new item to the list
      itemList.push(item);

      //creating or updating the list
      await AsyncStorage.setItem(collectionName, JSON.stringify(itemList))
        .then(() => {
          console.log(
            'It was saved successfully in collection:',
            collectionName,
          );
          RNToasty.Success({
            title: 'Great! The item has been saved to your collection',
          });
        })
        .catch(() => {
          console.log(
            'There was an error saving the item in collection:',
            collectionName,
          );
        });
    } else {
      //item already saved in storage
      RNToasty.Info({
        title: 'Check you profile: the item is already in your collection',
      });
    }
  } catch (error) {
    RNToasty.Error({
      title: 'Try again, an error occurred while saving the item',
    });
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
        RNToasty.Success({
          title: 'Item successfully removed from your collection',
        });
        console.log(
          'It was removed successfully from collection:',
          collectionName,
        );
      })
      .catch(() => {
        RNToasty.Error({
          title: 'Try again, an error occurred while saving the item',
        });
        console.log(
          'There was an error removing the item from collection:',
          collectionName,
        );
      });
  } catch (error) {
    RNToasty.Error({
      title: 'Try again, an error occurred while saving the item',
    });
    console.log(error);
  }
};
