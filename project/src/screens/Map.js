import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialMapView from '../components/MaterialMapView';
import {Center} from '@builderx/utils';

class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rect2} />
        <View style={styles.rect3}>
          <MaterialMapView style={styles.materialMapView} />
        </View>
        <Center horizontal>
          <TouchableOpacity text1="Back" style={styles.googlebtn} />
        </Center>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(38,64,74,1)',
  },
  rect2: {
    flex: 1,
    backgroundColor: 'rgba(38,64,74,1)',
    alignSelf: 'stretch',
  },
  rect3: {
    top: 176,
    left: 30,
    height: 315,
    backgroundColor: 'rgba(255,255,255,1)',
    position: 'absolute',
    right: 30,
  },
  materialMapView: {
    width: 300,
    height: 315,
  },
  googlebtn: {
    top: 544,
    width: 249,
    height: 37,
    position: 'absolute',
  },
});

export default Map;
