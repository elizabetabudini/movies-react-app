import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {auth} from '../config/firebase';
import FavouriteItem from '../components/FavouriteItem';
import AsyncStorage from '@react-native-community/async-storage';
import {removeItem} from '../storage/storageFunctions';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
  }
  state = {
    navListener: null,
    currentUser: null,
    movieList: [],
    isLoading: true,
    locationList: [],
  };

  async componentDidMount() {
    const {currentUser} = auth;
    this.setState({currentUser});
    await this.getItems('movies');
    await this.getItems('locations');
    this.navListener = this.props.navigation.addListener(
      'didFocus',
      async payload => {
        await this.getItems('movies');
        await this.getItems('locations');
      },
    );
  }

  render() {
    const {currentUser, movieList, locationList} = this.state;
    const {navigation} = this.props;
    console.log('State movies:', movieList);
    console.log('State locations:', locationList);

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListItem
          leftAvatar={{
            title: currentUser && currentUser.email[0],
            //source: {uri: currentUser && currentUser.photoURL},
            showAccessory: true,
          }}
          title={currentUser && currentUser.email}
        />
        <Card title="Saved movies">
          {movieList && movieList.length ? (
            <FlatList
              data={movieList}
              keyExtractor={item => item.idIMDB}
              initialNumToRender={20}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MovieCard', {
                        movieID: item.idIMDB,
                      })
                    }>
                    <FavouriteItem item={item} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //remove item and force re-render
                      removeItem(item, 'movies').then(() => {
                        this.getItems('movies');
                      });
                    }}
                    onLongPress={() => {
                      //share
                    }}>
                    <Icon name={'heart'} style={styles.iconStyle} />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text> No movies saved </Text>
          )}
        </Card>
        <Card title="Saved locations">
          {locationList && locationList.length ? (
            <View>
              <Text>Name</Text>
            </View>
          ) : (
            <Text> No locations saved </Text>
          )}
        </Card>
      </View>
    );
  }

  async getItems(collectionName) {
    let items = [];
    console.log('Getting items from:', collectionName);
    try {
      const collection = await AsyncStorage.getItem(collectionName);
      items = JSON.parse(collection);
    } catch (error) {
      console.log(error, 'error');
    } finally {
      if (collectionName === 'movies') {
        this.setState({movieList: items});
      } else {
        this.setState({locationsList: items});
      }
    }
  }
}

const styles = StyleSheet.create({
  name: {backgroundColor: 'powderblue', flex: 1},
  movies: {backgroundColor: 'skyblue', flex: 3},
  locations: {backgroundColor: 'steelblue', flex: 3},
});
