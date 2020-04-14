import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Ellipse} from 'react-native-svg';
import TextBox from '../components/TextBox';
import Button from '../components/Button';

class WelcomePage extends Component {
  _login = () => {
    this.props.navigation.navigate('Profile');
  };
  _googlelogin = () => {
    this.props.navigation.navigate('Profile');
  };

  render() {
    const google_button = (
      <Icon.Button name="google" onPress={() => {}}>
        <Text style={{color: 'rgba(255,255,255,1)'}}>Continue with Google</Text>
      </Icon.Button>
    );
    return (
      <View style={styles.container}>
        <View style={styles.formBack}>
          <View style={styles.ellipseColumn}>
            <Svg viewBox="0 0 59.95 60.34" style={styles.ellipse}>
              <Ellipse
                strokeWidth={1}
                fill="rgba(205,214,222,1)"
                stroke="rgba(230, 230, 230,1)"
                cx={30}
                cy={30}
                rx={29}
                ry={30}
              />
            </Svg>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <TextBox
              placeholder="Email"
              iconName="account"
              keyboard="email-address" //keyboard with @
              textContentType="emailAddress"
              style={styles.emailBox}
            />
            <TextBox
              placeholder="Password"
              iconName="lock"
              style={styles.passwordBox}
              secure={true}
            />
            <Button
              button1="WelcomePage"
              text1="Log in"
              style={styles.loginButton}
            />
            <TouchableOpacity style={styles.googleButton}>
              {google_button}
            </TouchableOpacity>
          </View>
          <View style={styles.ellipseColumnFiller} />
          <View style={styles.helpFooter}>
            <Text style={styles.createAccount}>Create account</Text>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(38,64,74,1)',
  },
  formBack: {
    width: '90%',
    height: 380,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 50,
    alignSelf: 'center',
    position: 'relative',
  },
  ellipse: {
    width: 60,
    height: 60,
    alignSelf: 'center'
  },
  welcomeText: {
    color: 'rgba(38,64,74,1)',
    fontSize: 30,
    fontFamily: 'calibri-regular',
    marginTop: 22,
    alignSelf: 'center'
  },
  emailBox: {
    width: '95%',
    height: 50,
    backgroundColor: 'rgba(235,235,235,1)',
    marginTop: 50,
    alignSelf: 'center'
  },
  passwordBox: {
    width: '95%',
    height: 50,
    backgroundColor: 'rgba(235,235,235,1)',
    marginTop: 17,
    alignSelf: 'center',
  },
  loginButton: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
  },
  googleButton: {
    marginTop: 95,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ellipseColumn: {
    width: 282,
    marginTop: -30, //center of the circle in the line of the container form
  },
  ellipseColumnFiller: {
    flex: 1,
  },
  helpFooter: {
    width: 241,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  createAccount: {
    color: 'rgba(38,64,74,1)',
    alignSelf: 'flex-start',
    fontFamily: 'roboto-regular',
  },
  forgotPassword: {
    color: 'rgba(38,64,74,1)',
    alignSelf: 'flex-start',
    fontFamily: 'roboto-regular',
  },
});

export default WelcomePage;
