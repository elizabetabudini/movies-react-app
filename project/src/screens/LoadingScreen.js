import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {auth} from '../config/firebase';
import imageLogo from '../assets/images/logo.png';

class LoadingScreen extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <ActivityIndicator color="#55a6e9" size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
export default LoadingScreen;
