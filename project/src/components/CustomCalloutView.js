import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import colors from '../config/colors';
import Svg from 'react-native-svg';

export class CustomCalloutView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.marker);
  }

  render() {
    return (
      <View >
        <View>
          <Text style={styles.text}>Address: {this.props.marker.address}</Text>
        </View>
        <View>
            <Text style={styles.text}>Films here:</Text>
            <Text style={styles.text}>
              {this.props.marker.title} ({this.props.marker.year})</Text>

             <Text>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.marker.poster,
              }}
            />
          </Text>
        </View>
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
    height: 80,
    resizeMode: 'stretch',
  },
  desc: {
    flexDirection: 'column',
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
    color: colors.WHITE,
    textAlign: 'left',
    height: 25,
  },
});
