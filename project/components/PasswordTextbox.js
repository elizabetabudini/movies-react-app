import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class PasswordTextbox extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon name="key" style={styles.iconStyle} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.inputStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(235,235,235,1)',
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
    flex: 1,
    color: '#000',
    alignSelf: 'stretch',
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

export default PasswordTextbox;
