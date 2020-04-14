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
import constants from '../config/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

interface State {
  email: string;
  password: string;
  emailTouched: boolean;
  passwordTouched: boolean;
}

class MoviesScreen extends React.Component<{}, State> {
  passwordInputRef = React.createRef();

  state: State = {
    email: '',
    password: '',
    emailTouched: false,
    passwordTouched: false,
  };

  handleEmailChange = (email: string) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password: string) => {
    this.setState({password: password});
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

  handleLoginPress = () => {
    console.log('Login button pressed');
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
          <FormTextInput
            iconName="account"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
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
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
          <Button1
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
            disabled={!email || !password}
          />

          <Button1
              iconName="google"
              label={strings.GOOGLE_LOGIN}
              onPress={this.handleLoginPress}
              style={{backgroundColor: colors.LIGHT_GRAY}}
          />
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

export default MoviesScreen;
