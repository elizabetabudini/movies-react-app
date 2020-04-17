import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

class MaterialMapView extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <MapView
          style={styles.mapView1}
          showsUserLocation={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mapView1: {
    flex: 1,
  },
});

export default MaterialMapView;
