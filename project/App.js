import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoadingScreen from './src/screens/LoadingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const AppNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    SignUp: SignUpScreen,
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
