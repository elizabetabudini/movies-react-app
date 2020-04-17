import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Loading from './src/screens/Loading';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Home: Home,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppNavigator);
