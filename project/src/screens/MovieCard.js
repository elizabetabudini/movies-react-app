import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import colors from '../config/colors';
import ListLocationItem from '../components/ListLocationItem';
import {Icon} from 'react-native-elements';
import WebView from 'react-native-webview';
import {database} from '../config/firebase';

class MovieCard extends React.Component {
  static navigationOptions = {
    title: 'Movie details',
    headerShown: true,
  };

  // you can use the Component's constructor for setting up props and states
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      locationList: [],
      isLoading: true,
      actors: '',
      directors: '',
      genres: '',
      firebaseKey: '',
    };
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.getMovieDetails(this.props.navigation.state.params.movieID);
      },
    );
    // used the movie title that's passed in to search for it's details
    this.getMovieDetails(this.props.navigation.state.params.movieID);
  }

  async getMovieDetails(movieID) {

    //find movie from firebase database
    var movie = '';
    var firebaseK = '';
    await database
      .ref('/movies')
      .orderByChild('idIMDB')
      .equalTo(movieID)
      .on('value', function(snapshot) {
        for (const key in snapshot.val()) {
          movie = snapshot.val()[key];
          firebaseK = key;
        }
      });
    this.setState({firebaseKey: firebaseK});
    this.setState({movieDetails: movie});

    //new IDs created when user adds a new location are not recognized by React Native so we use Object.values
    this.setState({locationList: Object.values(movie.filmingLocations)});

    var directors = [];
    //extract director names and separate with comma
    directors = movie.directors.map(item => item.name).join(', ');
    this.setState({directors: directors});

    var genres = [];
    //extract genres names and separate with comma
    genres = movie.genres.join(' | ');
    this.setState({genres: genres});

    var actors = [];
    //extract actors names and separate with comma
    actors = movie.actors.map(item => item.actorName).join(', ');
    this.setState({actors: actors});

    this.setState({isLoading: false});
  }

  render() {
    const {navigation} = this.props;
    const {
      isLoading,
      movieDetails,
      directors,
      actors,
      genres,
      firebaseKey,
    } = this.state;
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.locationList}
          keyExtractor={item => item.location}
          initialNumToRender={20}
          renderItem={({item}) => (
            <ListLocationItem
              item={item}
              modify={false}
              action={'display'}
              navigation={navigation}
            />
          )}
          ListHeaderComponent={
            <View>
              <WebView
                style={styles.imageStyle}
                javaScriptEnabled={true}
                source={{
                  uri: movieDetails.trailer.qualities[0].videoURL,
                }}
              />

              <Text style={styles.textStyle}>
                {movieDetails.title} ({movieDetails.year})
              </Text>
              <Text style={styles.little}>Directed by {directors}</Text>
              <Text style={styles.little}>Actors: {actors}</Text>
              <Text style={styles.little}>Genres: {genres}</Text>
              <View style={styles.locations}>
                <Text style={styles.textStyle}>
                  {movieDetails.filmingLocations.length} filming locations
                  found:
                </Text>
                <Icon
                  raised
                  name="pencil-plus"
                  color={colors.APP_BLUE}
                  type={'material-community'}
                  onPress={() =>
                    navigation.navigate('AddModify', {
                      firebaseKey: firebaseKey,
                      movie: movieDetails,
                    })
                  }
                />
              </View>
            </View>
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  locations: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.LIGHT_GRAY,
    margin: 10,
  },
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
  little: {
    color: colors.WHITE,
    fontSize: 13,
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imageStyle: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
export default MovieCard;
