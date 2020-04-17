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
import Movies from './Movies';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Settings from './Settings';
import {Button} from 'react-native-elements';
import {auth} from '../config/firebase';
import Login from './Login';

const Bottom = createBottomTabNavigator(
  {
    Map: Map,
    Movies: Movies,
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
        let IconComp = Icon;
        // You can return any component that you like here!
        return <IconComp name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

const HamburgerNavigation = createDrawerNavigator(
  {
    Tabs: Bottom,
  },
  {
    initialRouteName: 'Tabs',
    contentComponent: props => {
      return (
        <ScrollView>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Text
              onPress={() => {
                props.navigation.navigate('Settings');
                props.navigation.closeDrawer();
              }}>
              Settings
            </Text>
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
  Drawer: {
    screen: HamburgerNavigation,
  },
  Settings: Settings,
  Login: Login,
});

const AppContainer = createAppContainer(Stack);

export default class Home extends React.Component {
  render() {
    return <AppContainer />;
  }
}

/*const AppNavigator = createBottomTabNavigator(
  {
    Map: Map,
    Movies: Movies,
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
}*/
