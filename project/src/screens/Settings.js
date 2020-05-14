import React from 'react';
import {
  StyleSheet,
  AlertStatic as Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import firebase from '../config/firebase';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import LocationItem from '../components/LocationItem';

class Settings extends React.Component {
  // you can use the Component's constructor for setting up props and states
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      locationList: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    //const {movie} = this.props.route.params;
    // used the movie title that's passed in to search for it's details
    this.getMovieDetails('tt0000335');
  }

  getMovieDetails(movieID) {
    var token = 'de22ca05-8965-497b-b36e-9bf49c579aa2';
    var url =
      'https://www.myapifilms.com/imdb/idIMDB?idIMDB=' +
      movieID +
      '&token=de22ca05-8965-497b-b36e-9bf49c579aa2&format=json&filmingLocations=2';

    //get data from myfilm api
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({movieDetails: json.data.movies[0]});
        this.setState({locationList: json.data.movies[0].filmingLocations});
        console.log(this.state.locationList);
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {isLoading, movieDetails} = this.state;
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.container}>
        <WebView
          source={{uri: this.state.movieDetails.videoURL}}
          style={{marginTop: 10}}
        />
        <Image
          style={styles.imageStyle}
          source={{
            uri: this.state.movieDetails.urlPoster,
          }}
        />
        <Text style={styles.textStyle}>{movieDetails.title}</Text>
        <Text style={styles.textStyle}>{movieDetails.year}</Text>
        <Text style={styles.textStyle}>{movieDetails.videoURL}</Text>
        <FlatList
          data={this.state.locationList}
          keyExtractor={item => item.location}
          initialNumToRender={20}
          renderItem={({item}) => (
            <TouchableOpacity>
              <LocationItem item={item} iconName={'heart-o'} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.APP_BLUE,
  },
  textStyle: {
    color: colors.WHITE,
    fontSize: 20,
    textAlign: 'justify',
    margin: 10,
  },
  imageStyle: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
export default Settings;
