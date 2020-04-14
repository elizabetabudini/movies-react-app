import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MapScreen from '../screens/MapScreen';

class MaterialButtonPrimary extends Component {
  static displayName = 'Button';

  render() {
    let opacity = this.props.disabled ? 1 : 0.5;
    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={this.props.onPress}
        style={[styles.container, this.props.style]}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

MaterialButtonPrimary.defaultProps = {disabled: false};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  caption: {
    color: '#fff',
    alignSelf: 'center',
    right: -20,
    fontSize: 14,
    fontFamily: 'roboto-regular',
    textAlign: 'right',
    width: 133,
  },
});

export default MaterialButtonPrimary;
