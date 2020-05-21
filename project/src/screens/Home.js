import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Map from './Map';
import Profile from './Profile';
import MovieSearch from './MovieSearch';
import MovieCard from './MovieCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, ScrollView} from 'react-native';
import Settings from './Settings';
import {Button} from 'react-native-elements';
import {auth} from '../config/firebase';
import colors from '../config/colors';

const nav = createStackNavigator(
  {
    MovieSearch: {
      screen: MovieSearch,
      navigationOptions: {
        headerShown: false,
      },
    },
    MovieCard: MovieCard,
  },
  {
    initialRouteName: 'MovieSearch',
  },
);
const Bottom = createBottomTabNavigator(
  {
    Map: Map,
    Movies: nav,
    Profile: Profile,
  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = 'map';
        } else if (routeName === 'Profile') {
          iconName = 'account-circle';
        } else if (routeName === 'Movies') {
          iconName = 'library-movie';
        }
        return <Icon name={iconName} size={25} color={tintColor} />
        ;
      },
    }),
  },
);

const HamburgerNavigation = createDrawerNavigator(
  {
    Tabs: Bottom,
    // menu items
  },
  {
    initialRouteName: 'Tabs',
    contentComponent: props => {
      return (
        <ScrollView>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
                props.navigation.closeDrawer();
              }}
            />
            <Button
              title="Logout"
              onPress={async () => {
                try {
                  await auth.signOut(); //
                  props.navigation.navigate('Loading');
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </SafeAreaView>
        </ScrollView>
      );
    },
  },
);
const Stack = createStackNavigator({
  FilmTourist: {
    screen: HamburgerNavigation,
    navigationOptions: {
      headerShown: true,
      title: 'Film Tourist',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: colors.APP_BLUE,
      },
    },
  },
  Settings: Settings,
});

const AppContainer = createAppContainer(Stack);

export default class Home extends React.Component {
  render() {
    return <AppContainer />;
  }
}
