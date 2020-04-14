import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from './screens/WelcomePage';
import MapScreen from './screens/MapScreen';

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomePage,
    Map: MapScreen,
  },
  {
    initialRouteName: 'Welcome',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class FilmTourist extends React.Component {
  render() {
    return <AppContainer />;
  }
}
