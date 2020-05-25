import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {CustomCalloutView} from '../components/CustomCalloutView';

Geolocation.getCurrentPosition(info => console.log('current position:', info));
Geocoder.init('AIzaSyBWeYmaWDQotGB_BjI_x69LbE0NDIRJ4ck', {language: 'en'});

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navListener: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      movieLoc: 'undefined',
      markers: [],
    };
  }
  async componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.updateMap();
      },
    );
    this.getMarkers();
  }

  async getMarkers() {
    var locationList = [];
    var movieList = [];
    let movieURL = '';

    movieURL = 'https://filmproject-87d6c.firebaseio.com/.json';

    fetch(movieURL)
      .then(response => response.json())
      .then(json => {
        //get list of movies
        movieList = json.movies;
      })
      .catch(error => console.error(error))
      .finally(() => {
        //for each movie get list of locations
        movieList.forEach(item => {
          var locations = Object.values(item.filmingLocations);

          //for each location find coordinates based on address
          locations.forEach(loc => {
            if (loc !== null) {
              //get coords from address using Geocoder
              Geocoder.from(loc.location)
                .then(json => {
                  var coords = json.results[0].geometry.location;
                  const location = {
                    address: loc.location,
                    coords: {latitude: coords.lat, longitude: coords.lng},
                    title: item.title,
                    poster: item.urlPoster,
                    year: item.year,
                    id: item.idIMDB,
                  };
                  locationList.push(location);
                })
                .catch(error => console.warn(error))
                .finally(() =>
                  this.setState({markers: locationList}, function() {
                    //console.log(this.state.markers);
                    this.updateMap();
                  }),
                );
            }
          });
        });
      });
  }

  updateMap() {
    // if coming from movie details
    if (this.props.navigation.state.params) {
      let loc = JSON.stringify(this.props.navigation.state.params.location);
      this.setState({
        movieLoc: loc,
      });
      //locations are store in db as address, we need to convert the address into lat, long
      Geocoder.from(loc)
        .then(json => {
          var location = json.results[0].geometry.location;
          //focus on location given
          let region = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.00622 * 1.5,
            longitudeDelta: 0.00221 * 1.5,
          };
          this.onRegionChange(region, region.latitude, region.longitude);
        })
        .catch(error => console.warn(error));
    } else {
      //otherwise focus on user location
      Geolocation.watchPosition(position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      });
    }
  }

  //update the state when region changes
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}>
          {this.state.markers.map(marker => (
            <View>
              <MapView.Marker
                coordinate={marker.coords}
                icon={require('../assets/images/marker.png')}>
                <MapView.Callout
                  style={{flex: 1, position: 'relative'}}
                  onPress={() =>
                    this.props.navigation.navigate('MovieCard', {
                      movieID: marker.id,
                    })
                  }>
                  <CustomCalloutView marker={marker} />
                </MapView.Callout>
              </MapView.Marker>
            </View>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
