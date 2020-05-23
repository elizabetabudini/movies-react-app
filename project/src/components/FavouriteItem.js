import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import colors from '../config/colors';

class FavouriteItem extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, itemType} = this.props;
    return itemType === 'movie' ? (
      <View style={styles.view}>
        <TouchableOpacity style={styles.containerStyle}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: item.urlPoster,
            }}
          />
          <View>
            <Text style={styles.text}>
              {item.title} ({item.year})
            </Text>
            <Text style={styles.little}>
              Director: {item.directors[0].name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.view}>
        <TouchableOpacity style={styles.containerStyle}>
          <View style={styles.desc}>
            <Text style={styles.text}>{item.location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center', //vertically centered
    width: '100%',
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center', //vertically centered
    alignSelf: 'stretch',
    width: '100%',
    padding: 5,
  },

  imageStyle: {
    width: 50,
    height: 70,
    resizeMode: 'stretch',
  },
  iconStyle2: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 22,
    margin: 10,
  },
  little: {
    paddingLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: colors.SILVER,
    textAlign: 'left',
    height: 25,
  },
  text: {
    paddingLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colors.APP_BLUE,
    textAlign: 'left',
    height: 25,
  },
});

export default FavouriteItem;
