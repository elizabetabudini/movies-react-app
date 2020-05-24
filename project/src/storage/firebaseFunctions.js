import {database} from '../config/firebase';
import {RNToasty} from 'react-native-toasty';

export const manageItem = async (
  newLocation,
  oldLocation,
  firebaseKey,
  action,
) => {
  console.log('movie firebase key:', firebaseKey);

  //get locations for the movie
  var filmingLocRef = await database
    .ref('/movies')
    .child(firebaseKey)
    .child('filmingLocations');

  //location firebase key
  var locK = '';

  //find location key
  await filmingLocRef
    .orderByChild('location')
    .equalTo(oldLocation)
    .on('value', function(snapshot) {
      for (const key in snapshot.val()) {
        locK = key;
      }
    });

  const locationAdd = {
    location: newLocation,
    remark: '',
  };
  console.log('key firebase location:', locK);
  if (locK === '') {
    await filmingLocRef.push(locationAdd);
    RNToasty.Success({
      title: 'Thank you for your contribution. Item added',
    });
  } else {
    if (action === 'modify') {
      await filmingLocRef.child(locK).update(locationAdd);
      RNToasty.Success({
        title: 'Thank you for your contribution. Item updated',
      });
    } else {
      await filmingLocRef.child(locK).remove();
      RNToasty.Success({
        title: 'Thank you for your contribution. Item removed',
      });
    }
  }
};
