import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {auth} from '../config/firebase';
import Button1 from '../components/Button1';

export default class Movies extends React.Component {
  static navigationOptions = {
    headerTitle: 'Movies',
    headerLeft: () => (
      <Button1
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };
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
