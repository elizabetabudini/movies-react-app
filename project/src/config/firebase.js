import * as firebase from 'firebase';
import algoliasearch from 'algoliasearch';
//var admin = require('firebase-admin');
//const functions = require('firebase-functions');

//var serviceAccount = require('../serviceAccountKey.json');

/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://filmproject-87d6c.firebaseio.com',
});*/


let config = {
  apiKey: 'AIzaSyDH675NFfG5rUHEECwfVgzxN79yW4TxdYs',
  authDomain: 'filmproject-87d6c.firebaseapp.com',
  databaseURL: 'https://filmproject-87d6c.firebaseio.com',
  projectId: 'filmproject-87d6c',
  storageBucket: 'filmproject-87d6c.appspot.com',
  messagingSenderId: '65851562381',
  appId: '1:65851562381:web:dd4ee05b588230df9205c4',
};
export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());




export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();

const ALGOLIA_ID = 'Y3EZO56OSL';
const ALGOLIA_ADMIN_KEY = '3d1a4724aacb15e3078c0bf410c1ac04';
const ALGOLIA_SEARCH_KEY = 'fd8f4f89c363b3dae1664d2a64319cde';
const ALGOLIA_INDEX_NAME = 'movies';

// configure algolia
export const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);
const movieRef = database.ref('/movies');

movieRef.on('child_added', addOrUpdateIndexRecord);
movieRef.on('child_changed', addOrUpdateIndexRecord);
movieRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(contact) {
  // Get Firebase object
  const record = contact.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = contact.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord({key}) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
      process.exit(1);
    });
}
