import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addItem} from '../storage/storageFunctions';
import WebView from 'react-native-webview';

export class CustomCalloutView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Address: {this.props.marker.address}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => addItem(this.props.marker, 'locations')}
            style={styles.myButton}>
            <Icon name={'heart'} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.myButton}>
            <Icon name={'share-variant'} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.myButton}>
            <Icon name={'map-marker-check'} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row-reverse', marginTop: 10}}>
          <Text style={styles.title}>
            {this.props.marker.title} ({this.props.marker.year})
          </Text>
          <View
            style={{
              height: 70,
              width: 50,
            }}>
            <WebView source={{uri: this.props.marker.poster}} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  myButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: colors.APP_BLUE,
    margin: 5,
  },
  iconStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto',
    fontSize: 20,
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
  title: {
    flex: 3,
    flexWrap: 'wrap',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginLeft: 10,
    color: colors.APP_BLUE,
    textAlign: 'left',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Roboto',
    fontSize: 15,
    color: colors.APP_BLUE,
    textAlign: 'left',
  },
});
