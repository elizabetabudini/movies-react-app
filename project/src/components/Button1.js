import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  disabled?: boolean; // Add a "disabled" prop
  label: string;
  onPress: () => void;
}

class Button1 extends React.Component<Props> {
  render() {
    const {disabled, label, onPress, iconName} = this.props;
    // If the button is disabled we lower its opacity
    const containerStyle = [
      styles.container,
      disabled ? styles.containerDisabled : styles.containerEnabled,
    ];

    if (!iconName) {
      //if no icon is required
      return (
        <TouchableOpacity
          style={containerStyle}
          onPress={onPress}
          disabled={disabled}>
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={containerStyle}
          onPress={onPress}
          disabled={disabled}>
          <Icon name={iconName} style={styles.iconStyle} />
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.APP_BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  iconStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8
  },
  containerEnabled: {
    opacity: 1,
  },
  containerDisabled: {
    opacity: 0.3,
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
    height: 20,
  },
});

export default Button1;
