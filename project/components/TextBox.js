import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TextBox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name={props.iconName || 'account'} style={styles.iconStyle} />
      <TextInput
        placeholder={props.placeholder || 'Email'}
        keyboardType={props.keyboard || 'default'}
        secureTextEntry={props.secure || false}
        clearButtonMode="while-editing"
        style={styles.inputStyle}
      />
    </View>
  );
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
    //style of the line below input field
    width: '80%',
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

export default TextBox;
