import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {auth} from '../config/firebase';
import FavouriteItem from '../components/FavouriteItem';
import AsyncStorage from '@react-native-community/async-storage';
import {removeItem} from '../storage/storageFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import colors from '../config/colors';

let facebookParameters = '';
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
    locationsList: [],
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

  share(idIMDB) {
    var url = 'https://www.imdb.com/title/' + idIMDB + '/';
    Share.open({url: url})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  render() {
    const {currentUser, movieList, locationsList} = this.state;
    const {navigation} = this.props;
    console.log('State movies:', movieList);
    console.log('State locations:', locationsList);

    return (
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
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
                    <FavouriteItem item={item} itemType={'movie'} />
                  </TouchableOpacity>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        //remove item and force re-render
                        removeItem(item, 'movies').then(() => {
                          this.getItems('movies');
                        });
                      }}>
                      <Icon name={'heart'} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.share(item.idIMDB)}>
                      <Icon name={'share-alt'} style={styles.iconStyle} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text> No movies saved </Text>
          )}
        </Card>
        <Card title="Saved locations">
          {locationsList && locationsList.length ? (
            <FlatList
              data={locationsList}
              keyExtractor={item => item.location}
              initialNumToRender={20}
              renderItem={({item}) => (
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Map', {
                        location: item.location,
                      })
                    }>
                    <FavouriteItem item={item} itemType={'location'} />
                  </TouchableOpacity>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        //remove item and force re-render
                        removeItem(item, 'locations').then(() => {
                          this.getItems('locations');
                        });
                      }}>
                      <Icon name={'heart'} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon name={'share-alt'} style={styles.iconStyle} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text> No locations saved </Text>
          )}
        </Card>
      </ScrollView>
    );
  }

  async getItems(collectionName) {
    let items = [];
    console.log('Profile.js -> Getting items from:', collectionName);
    try {
      const collection = await AsyncStorage.getItem(collectionName);
      items = JSON.parse(collection);
    } catch (error) {
      console.log(error, 'error');
    } finally {
      if (collectionName === 'movies') {
        this.setState({movieList: items});
      } else {
        console.log('Profile.js -> Locations:', items);
        this.setState({locationsList: items});
      }
    }
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
