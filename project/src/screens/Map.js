import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

Geolocation.getCurrentPosition(info => console.log(info));
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
    };
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
            latitudeDelta: 0.622 * 1.5,
            longitudeDelta: 0.221 * 1.5,
          };
          this.onRegionChange(region, region.latitude, region.longitude);
        })
        .catch(error => console.warn(error));
    } else {
      console.log('focus on user location');
      //otherwise focus on user location
      this.watchID = Geolocation.watchPosition(position => {
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

  componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.updateMap();
      },
    );
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
          <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat + 0.0005 || -36.82339,
              longitude: this.state.lastLong + 0.0005 || -73.03569,
            }}>
            <View>
              <Text style={{color: '#000'}}>
                {this.state.lastLong} / {this.state.lastLat}
              </Text>
            </View>
          </MapView.Marker>
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
