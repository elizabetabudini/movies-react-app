import algoliasearch from 'algoliasearch';
import {database} from './firebase';

const ALGOLIA_ID = 'WE7UV8IK5T';
const ALGOLIA_ADMIN_KEY = '0ca57c9fefc26603c90a7cb030bd2c62';
const ALGOLIA_SEARCH_KEY = 'c693440da34a63aa39b40d497a440dc2';
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
