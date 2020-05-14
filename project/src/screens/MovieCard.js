import React from 'react';
import {
  StyleSheet,
  AlertStatic as Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import firebase from '../config/firebase';

class MovieCard extends React.Component {
  getMovieDetails(movieID) {
    var token = 'de22ca05-8965-497b-b36e-9bf49c579aa2';
    var url =
      'https://www.myapifilms.com/imdb/idIMDB?idIMDB=' +
      movieID +
      '&token=de22ca05-8965-497b-b36e-9bf49c579aa2&format=json&location=2';

    //get data from myfilm api
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({movieDetails: json});
      })
      .catch(error => console.error(error));
  }
  render() {
    const facebook_button = (
      <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        size={20}
        onPress={() => {
          Alert.alert('Facebook Button Clicked');
        }}>
        <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
          Movie Card
        </Text>
      </Icon.Button>
    );

    const twitter_button = (
      <Icon.Button
        name="twitter"
        backgroundColor="#51aaf0"
        size={20}
        onPress={() => {
          Alert.alert('Twitter Button Clicked');
        }}>
        <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
          Follow Us on Twitter
        </Text>
      </Icon.Button>
    );

    const android_icon = <Icon name="android" size={60} color="#007c00" />;

    const music_icon = <Icon name="music" size={60} color="#fb3742" />;

    return (
      <View style={styles.MainContainer}>
        <WebView
          source={{uri: 'http://m.imdb.com/title/tt4158110/videogallery'}}
          style={{marginTop: 20}}
        />
        <TouchableOpacity>{facebook_button}</TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {twitter_button}
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {android_icon}
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {music_icon}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
});
export default MovieCard;
