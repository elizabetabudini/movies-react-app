import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import WelcomePage from './screens/WelcomePage';
import MapScreen from './screens/MapScreen';

let navigator = StackNavigator({
  Welcome: {screen: WelcomePage /*, navigationOptions: headerOptions*/},
  Map: {screen: MapScreen /*, navigationOptions: headerOptions*/},
});

export default navigator;
