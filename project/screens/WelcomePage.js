import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import EmailTextbox from '../components/EmailTextbox';
import PasswordTextbox from '../components/PasswordTextbox';
import MaterialButtonLight from '../components/MaterialButtonLight';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';

function WelcomePage(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect2} />
      <View style={styles.group3}>
        <View style={styles.group5}>
          <View style={styles.group2}>
            <View style={styles.rect3}>
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
              <Text style={styles.welcome}>Welcome!</Text>
              <EmailTextbox style={styles.email} />
              <PasswordTextbox style={styles.password} />
              <View style={styles.group4}>
                <Text style={styles.createAccount}>Create account</Text>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </View>
              <MaterialButtonLight style={styles.loginbtn} />
            </View>
          </View>
          <MaterialButtonPrimary style={styles.googlebtn} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(38,64,74,1)',
  },
  rect2: {
    flex: 1.13,
    backgroundColor: 'rgba(38,64,74,1)',
    alignSelf: 'stretch',
  },
  group3: {
    top: 160,
    left: 30,
    flex: -0.13,
    position: 'absolute',
    right: 30,
    bottom: 160,
    justifyContent: 'center',
  },
  group5: {
    width: 322,
    height: 420,
    alignSelf: 'center',
  },
  group2: {
    height: 384,
  },
  rect3: {
    height: 315,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 16,
  },
  ellipse: {
    width: 60,
    height: 60,
    marginTop: -28,
    alignSelf: 'center',
  },
  welcome: {
    color: 'rgba(38,64,74,1)',
    fontSize: 30,
    fontFamily: 'calibri-regular',
    marginTop: 16,
    alignSelf: 'center',
  },
  email: {
    width: 283,
    height: 39,
    backgroundColor: 'rgba(235,235,235,1)',
    marginTop: 27,
    alignSelf: 'center',
  },
  password: {
    width: 283,
    height: 43,
    marginTop: 13,
    marginLeft: 19,
  },
  group4: {
    width: 189,
    height: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21,
    alignSelf: 'center',
  },
  createAccount: {
    width: 79,
    height: 13,
    color: 'rgba(38,64,74,1)',
    flexWrap: 'wrap',
    fontSize: 13,
    fontFamily: 'calibri-regular',
    textDecoration: 'underline',
  },
  forgotPassword: {
    width: 94,
    height: 13,
    color: 'rgba(38,64,74,1)',
    fontSize: 13,
    fontFamily: 'calibri-regular',
    textDecoration: 'underline',
  },
  loginbtn: {
    width: 123,
    height: 36,
    marginTop: 32,
    alignSelf: 'center',
  },
  googlebtn: {
    width: 267,
    height: 37,
    marginLeft: 27,
  },
});

export default WelcomePage;
