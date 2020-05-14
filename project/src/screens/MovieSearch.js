import React, {Component} from 'react';
import {
  AlertStatic as Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {InstantSearch} from 'react-instantsearch/native';
import {
  connectInfiniteHits,
  connectSearchBox,
} from 'react-instantsearch/connectors';
import ListItem from '../components/ListItem';
import {client} from '../config/firebase';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Fontisto';

var width = Dimensions.get('window').width; //full width

export default class MovieSearch extends React.Component {
  static navigationOptions = () => {
    return {
      headerLeft: <Icon name={'home'} style={styles.iconStyle2} />,
    };
  };
  //Adapted from https://blog.expo.io/using-algolia-to-implement-search-within-an-expo-firebase-project-da66e3aa8239
  /*
  InstantSearch is a Algolia Componenet to search in a Firebase database which doesn't have indexing
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <InstantSearch searchClient={client} indexName={'movies'}>
          <View style={styles.searchContainer}>
            <ConnectedSearchBar />
          </View>

          <ConnectedHits />
        </InstantSearch>
      </View>
    );
  }
}
class SearchBar extends Component {
  _textInput: TextInput;
  state: State = {
    isFocused: false,
  };
  render() {
    return (
      <View style={styles.view}>
        <View style={styles.input}>
          <Icon name={'search'} style={styles.iconStyle} />
          <TextInput
            placeholder={'Search movie title or director name'}
            returnKeyType="done"
            clearButtonMode="while-editing"
            style={styles.textInput}
            onChangeText={text => this.props.refine(text)}
            value={this.props.currentRefinement}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoFocus
          />
        </View>
      </View>
    );
  }
  focus() {
    this._textInput && this._textInput.focus();
  }
}
SearchBar.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string,
};
const ConnectedSearchBar = connectSearchBox(SearchBar);
class Hits extends Component {
  render() {
    return this.props.hits.length > 0 ? (
      <FlatList
        data={this.props.hits}
        keyExtractor={item => item.objectID}
        initialNumToRender={20}
        renderItem={({item}) => (
          <TouchableOpacity
            onClick={() => {
              Alert.alert('clickedObjectIDs', {
                index: 'INDEX_NAME',
                eventName: 'See details',
                objectIDs: [item.objectID],
              });
            }}>
            <ListItem item={item} iconName={'heart-o'} />
          </TouchableOpacity>
        )}
      />
    ) : null;
  }
}

Hits.propTypes = {
  hits: PropTypes.array.isRequired, //the records that match the search state
  refine: PropTypes.func.isRequired, //the function to call when the end of the page is reached to load more results.
  hasMore: PropTypes.bool.isRequired, //a boolean that indicates if there are more pages to load
};
const ConnectedHits = connectInfiniteHits(Hits);
const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconStyle: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.beige,
  },
  searchContainer: {
    width: width,
    borderBottomWidth: 2,
    backgroundColor: colors.MISCHKA,
    borderBottomColor: colors.APP_BLUE,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    fontSize: 18,
    padding: 10,
    width: '90%',
  },
});
