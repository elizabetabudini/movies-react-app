import React, {Component} from 'react';
import {View, TextInput, StyleSheet, FlatList, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {InstantSearch} from 'react-instantsearch/native';
import {
  connectSearchBox,
  connectInfiniteHits,
} from 'react-instantsearch/connectors';
import ListItem from '../components/ListItem';
var width = Dimensions.get('window').width; //full width
import client from '../config/firebase';

export default class Movies extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <InstantSearch searchClient={client}>
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
    const {isFocused} = this.state;
    return (
      <TextInput
        returnKeyType="done"
        clearButtonMode="while-editing"
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        style={styles.textInput}
        onChangeText={text => this.props.refine(text)}
        value={this.props.currentRefinement}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoFocus
      />
    );
  }
  focus() {
    this._textInput && this._textInput.focus();
  }
  blur() {
    this._textInput && this._textInput.blur();
  }
  _onFocus = () => {
    this.setState({isFocused: true});
    this.props.onFocus && this.props.onFocus();
  };
  _onBlur = () => {
    this.setState({isFocused: false});
    this.props.onBlur && this.props.onBlur();
  };
}
SearchBar.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string,
};
const ConnectedSearchBar = connectSearchBox(SearchBar);
class Hits extends Component {
  render() {
    const hits =
      this.props.hits.length > 0 ? (
        <FlatList
          data={this.props.hits}
          renderItem={this.renderItem}
          keyExtractor={item => item.objectID}
          initialNumToRender={20}
        />
      ) : null;
    return hits;
  }
  renderItem({item}) {
    return <ListItem item={item} />;
  }
}
Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};
const ConnectedHits = connectInfiniteHits(Hits);
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  searchContainer: {
    width: width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgb(200, 199, 204)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    height: 20,
    width: 20,
  },
  textInput: {
    height: 30,
    fontSize: 24,
    width: width - 20,
  },
});
