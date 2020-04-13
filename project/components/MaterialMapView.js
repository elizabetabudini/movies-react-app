import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

function MaterialMapView(props) {
  return (
    <View style={[styles.container, props.style]}>
      <MapView customMapStyle={'undefined'} style={styles.mapView1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  mapView1: {
    flex: 1,
    backgroundColor: 'rgb(230,230,230)',
  },
});

export default MaterialMapView;
