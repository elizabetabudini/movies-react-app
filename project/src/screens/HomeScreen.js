import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import MoviesScreen from './MoviesScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppNavigator = createBottomTabNavigator(
  {
    Map: MapScreen,
    Movies: MoviesScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (routeName === 'Profile') {
          iconName = focused ? 'fa-user-circle' : 'fa-user-circle';
        } else if (routeName === 'Movies') {
          iconName = focused ? 'fa-user-circle' : 'ios-list';
        }
        let IconComp = Icon;
        // You can return any component that you like here!
        return <IconComp name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class HomeScreen extends React.Component {
  render() {
    return <AppContainer />;
  }
}
