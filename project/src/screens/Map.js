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
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    };
  }

  componentDidMount() {
    let location = 'undefined'
    // if coming from movie details
    if(this.props.navigation.state.params){
      location = JSON.stringify(this.props.navigation.state.params.location);
    }

    if (location !== 'undefined') {
      console.log('loc: ', location);
      //locations are store in db as address, we need to convert the address into lat, long
      Geocoder.from(location)
        .then(json => {
          var location = json.results[0].geometry.location;
          //focus on location given
          let region = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 6.22 * 1.5,
            longitudeDelta: 2.21 * 1.5,
          };
          this.onRegionChange(region, region.latitude, region.longitude);
        })
        .catch(error => console.warn(error));
    } else {
      console.log('else: ');
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
