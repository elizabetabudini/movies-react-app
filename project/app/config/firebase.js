import * as firebase from 'react-native-firebase';
let config = {
  apiKey: 'AIzaSyDH675NFfG5rUHEECwfVgzxN79yW4TxdYs',
  authDomain: 'filmproject-87d6c.firebaseapp.com',
  databaseURL: 'https://filmproject-87d6c.firebaseio.com',
  projectId: 'filmproject-87d6c',
  storageBucket: 'filmproject-87d6c.appspot.com',
  messagingSenderId: '65851562381',
  appId: '1:65851562381:web:dd4ee05b588230df9205c4',
};
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
