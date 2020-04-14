import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

class MaterialButtonLight extends Component {
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

MaterialButtonLight.defaultProps = {disabled: false};

export default MaterialButtonLight;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(38,64,74,1)',
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
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'roboto-regular',
  },
});
