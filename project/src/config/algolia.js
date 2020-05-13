import functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

// [START init_algolia]
// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'movies';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// [START update_index_function]
// Update the search index every time a movie is added.
exports.onNoteCreated = functions.firestore
  .document('movies/{imdbID}')
  .onCreate((snap, context) => {
    // Get the note document
    const movie = snap.data();

    // Add an 'objectID' field which Algolia requires
    movie.objectID = context.params.imdbID;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(movie);
});
