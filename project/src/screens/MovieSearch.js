import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {InstantSearch} from 'react-instantsearch/native';
import {
  connectInfiniteHits,
  connectSearchBox,
} from 'react-instantsearch/connectors';
import ListMovieItem from '../components/ListMovieItem';
import {client} from '../config/algolia';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addItem} from '../storage/storageFunctions';

var width = Dimensions.get('window').width; //full width

/**
 *  Search screen
 *  Based on Algolia search tool
 *  Search a movie by title or director and
 *  click on it to navigate to the movie details screen
 *
 *  Author: Elizabeta Budini
 *  Adapted from https://blog.expo.io/using-algolia-to-implement-search-within-an-expo-firebase-project-da66e3aa8239
 *  Date: 25/05/2020
 *
 *  */
export default class MovieSearch extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(item) {
    this.props.navigation.navigate('MovieCard', {movie: item});
  }

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
          <ConnectedHits navigation={this.props.navigation} />
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

const ConnectedHits = connectInfiniteHits(
  ({hits, hasMore, refine, navigation}) => {
    const onEndReached = function() {
      if (hasMore) {
        refine();
      }
    };

    return hits.length > 0 ? (
      <FlatList
        data={hits}
        onEndReached={onEndReached}
        keyExtractor={item => item.objectID}
        initialNumToRender={20}
        renderItem={({item}) => (
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieCard', {movieID: item.idIMDB})
              }
              onLongPress={() => addItem(item, 'movies')}>
              <ListMovieItem item={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    ) : null;
  },
);
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center', //vertically centered
    alignSelf: 'stretch',
    width: '90%',
    padding: 5,
  },
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
