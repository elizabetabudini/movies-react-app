import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class EmailTextbox extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon name="account" style={styles.iconStyle} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          clearButtonMode="while-editing"
          style={styles.inputStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#616161',
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
  },
  inputStyle: {
    width: 327,
    height: 43,
    color: '#000',
    marginLeft: 16,
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: '#D9D5DC',
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
});

export default EmailTextbox;
