import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {auth} from '../config/firebase';

export default class MoviesScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = auth;
    this.setState({currentUser});
  }

  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>
          {' '}
          Hi
          <Text style={{color: '#e93766', fontSize: 20}}>
            {currentUser && currentUser.email}!
          </Text>
        </Text>
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
});
