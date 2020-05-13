import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ListItem extends React.Component<Props> {
  render() {
    const {iconName, movie} = this.props;

    //if the movie is saved in user favorite list,
    //we add an icon to the list item
    if (!iconName) {
      //if no icon is required
      return (
        <TouchableOpacity style={styles.containerStyle}>
          <Image
            source={{
              uri: movie.urlPoster,
            }}
          />
          <Text style={styles.text}>{movie.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.containerStyle}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: movie.urlPoster,
            }}
          />
          <Text style={styles.text}>{movie.title}</Text>
          <Icon name={iconName} style={styles.iconStyle} />
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.APP_BLUE,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  iconStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
    height: 20,
  },
});

export default ListItem;
