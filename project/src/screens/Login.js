import * as React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';
import Button1 from '../components/Button1';
import FormTextInput from '../components/FormTextInput';
import imageLogo from '../assets/images/logo.png';
import colors from '../config/colors';
import strings from '../config/strings';
import {auth} from '../config/firebase';
import constants from '../config/constants';

interface State {
  email: string;
  password: string;
  emailTouched: boolean;
  passwordTouched: boolean;
  errorMessage: null;
}

/**
 *  Login screen
 *  User will input email and password to login
 *  or click Signup to navigate to SignUp.js
 *
 *  Author: Elizabeta Budini
 *  modiefied from https://github.com/mmazzarolo/the-starter-app/
 *  Date: 25/05/2020
 *
 *  */
class Login extends React.Component<{}, State> {
  passwordInputRef = React.createRef();

  state: State = {
    email: '',
    password: '',
    emailTouched: false,
    passwordTouched: false,
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({emailTouched: true});
  };

  handlePasswordBlur = () => {
    this.setState({passwordTouched: true});
  };

  handleLogin = () => {
    const {email, password} = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    const {email, password, emailTouched, passwordTouched} = this.state;
    const emailError =
      !email && emailTouched ? strings.EMAIL_REQUIRED : undefined;
    const passwordError =
      !password && passwordTouched ? strings.PASSWORD_REQUIRED : undefined;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // Prevent Android from handling the keyboard behaviour
        behavior={constants.IS_IOS ? 'padding' : undefined}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          <FormTextInput
            iconName="account"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={strings.EMAIL_PLACEHOLDER}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onBlur={this.handleEmailBlur}
            error={emailError}
            blurOnSubmit={constants.IS_IOS}
          />
          <FormTextInput
            iconName="lock"
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
          <Button1
            label={strings.LOGIN}
            onPress={this.handleLogin}
            disabled={!email || !password}
          />
          <View>
            <Text>
              Don't have an account?{' '}
              <Text
                onPress={() => this.props.navigation.navigate('SignUp')}
                style={{color: '#e93766', fontSize: 18}}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});

export default Login;
