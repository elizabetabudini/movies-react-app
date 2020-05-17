import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addItem, removeItem, isSaved} from '../storage/storageFunctions';

class FavouriteIcon extends React.Component<Props> {
  render() {
    const {iconName, item} = this.props;
    var saved = 'heart';

    if (iconName === saved) {
      //if item is already in asyncstorage
      return (
        <TouchableOpacity
          onPress={() => {
            removeItem(item, 'movies');
          }}>
          <Icon name={iconName} style={styles.iconStyle} />
        </TouchableOpacity>
      );
    } else {
      //if item is already in asyncstorage
      return (
        <TouchableOpacity
          onPress={() => {
            addItem(item, 'movies');
          }}>
          <Icon name={iconName} style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default FavouriteIcon;
