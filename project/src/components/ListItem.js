import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  View,
} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
var width = Dimensions.get('window').width; //full width

class ListItem extends React.Component<Props> {
  render() {
    const {item} = this.props;

    //if the movie is saved in user favorite list,
    //we add a heart icon to the list item
    return (
      <View style={styles.view}>
        <TouchableOpacity style={styles.containerStyle}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: item.urlPoster,
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.text}>
              {item.title} ({item.year})
            </Text>
            <Text style={styles.little}>
              Director: {item.directors[0].name}
            </Text>
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
  iconStyle: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  imageStyle: {
    width: 50,
    height: 70,
    resizeMode: 'stretch',
  },
  desc: {
    flexDirection: 'column',
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

export default ListItem;
