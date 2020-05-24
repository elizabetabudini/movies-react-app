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
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Settings from './Settings';
import {Button, ListItem} from 'react-native-elements';
import {auth} from '../config/firebase';
import colors from '../config/colors';
import {Drawer} from 'react-native-paper';
import AddModifyLocations from './AddModifyLocations';

const nav = createStackNavigator(
  {
    MovieSearch: {
      screen: MovieSearch,
      navigationOptions: {
        headerShown: false,
      },
    },
    MovieCard: MovieCard,
    AddModify: {
      screen: AddModifyLocations,
      navigationOptions: {
        headerShown: false,
      },
    },
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
        return <Icon name={iconName} size={25} color={tintColor} />;
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
      const {currentUser} = auth;
      return (
        <ScrollView>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <ListItem
              leftAvatar={{
                title: currentUser && currentUser.email[0],
                //source: {uri: currentUser && currentUser.photoURL},
                showAccessory: true,
              }}
              title={currentUser && currentUser.email}
            />
            <Drawer.Item
              style={{backgroundColor: colors.LIGHT_GRAY}}
              icon="settings"
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
                props.navigation.closeDrawer();
              }}
            />
            <Drawer.Item
              style={{backgroundColor: colors.LIGHT_GRAY}}
              icon="logout"
              label="Logout"
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
    navigationOptions: ({navigation}) => {
      return {
        headerShown: true,
        title: 'Film Tourist',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.APP_BLUE,
        },
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <Icon name="menu" style={styles.icon} />
          </TouchableOpacity>
        ),
      };
    },
  },
  Settings: Settings,
});
const styles = StyleSheet.create({
  text: {
    color: colors.APP_BLUE,
    fontSize: 20,
  },
  options: {
    marginLeft: 10,
    borderBottomColor: colors.APP_BLUE,
  },
  icon: {
    color: colors.WHITE,
    fontFamily: 'Roboto',
    fontSize: 30,
    marginLeft: 15,
  },
});

const AppContainer = createAppContainer(Stack);

export default class Home extends React.Component {
  render() {
    return <AppContainer />;
  }
}
