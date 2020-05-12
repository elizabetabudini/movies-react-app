import React from 'react';
import {
  StyleSheet,
  AlertStatic as Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class Profile extends React.Component {
  render() {
    const facebook_button = (
      <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        size={20}
        onPress={() => {
          Alert.alert('Facebook Button Clicked');
        }}>
        <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
          Login with Facebook
        </Text>
      </Icon.Button>
    );

    const twitter_button = (
      <Icon.Button
        name="twitter"
        backgroundColor="#51aaf0"
        size={20}
        onPress={() => {
          Alert.alert('Twitter Button Clicked');
        }}>
        <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>
          Follow Us on Twitter
        </Text>
      </Icon.Button>
    );

    const android_icon = <Icon name="android" size={60} color="#007c00" />;

    const music_icon = <Icon name="music" size={60} color="#fb3742" />;

    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity>{facebook_button}</TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {twitter_button}
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {android_icon}
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 10}}>
          {music_icon}
        </TouchableOpacity>

        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
});
export default Profile;
