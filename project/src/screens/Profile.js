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
  }
  state = {
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
  }

  render() {
    const {currentUser, movieList} = this.state;
    const {navigation} = this.props;
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
                    //remove item and re-render
                    removeItem(item, 'movies').then(this.getItems('movies'));
                  }}
                  onLongPress={() => {
                    //share
                  }}>
                  <Icon name={'heart'} style={styles.iconStyle} />
                </TouchableOpacity>
              </View>
            )}
          />
        </Card>
        <Card title="Saved locations">
          {
            <View>
              <Text>Name</Text>
            </View>
          }
        </Card>
      </View>
    );
  }

  async getItems(collectionName) {
    let items = [];
    try {
      const collection = await AsyncStorage.getItem(collectionName);
      items = JSON.parse(collection);
      console.log('Returned list:', items);
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
