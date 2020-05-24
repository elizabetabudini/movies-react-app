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
import {addItem} from '../storage/storageFunctions';
import Share from 'react-native-share';
import Geocoder from 'react-native-geocoding';
import {manageItem} from '../storage/firebaseFunctions';

class ListLocationItem extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  share(location, movieDetails) {
    Geocoder.from(location)
      .then(json => {
        var coords = json.results[0].geometry.location;
        var url =
          'https://www.google.com/maps/?q=' + coords.lat + ',' + coords.lng;
        Share.open({
          url: url,
          message: movieDetails.title + ' was filmed here!',
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
      })
      .catch(error => console.warn(error));
  }
  render() {
    const {item, movieDetails, modify, firebaseKey} = this.props;

    return modify ? (
      //edit mode, for the user to contribute to locations database
      <View style={styles.containerStyle}>
        <View style={styles.desc2}>
          <Text style={styles.text}>{item.location}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              manageItem(item.location, firebaseKey, 'remove')
            }>
            <Icon name={'trash'} style={styles.iconStyle2} />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      //visualize mode, for the user to see locations in movie card screen
      <View style={styles.containerStyle}>
        <TouchableOpacity
          style={styles.desc}
          onPress={() =>
            this.props.navigation.navigate('Map', {
              location: this.props.item.location,
            })
          }>
          <Text style={styles.text}>{item.location}</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => addItem(item, 'locations')}>
            <Icon name={'heart-o'} style={styles.iconStyle2} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.share(item.location, movieDetails)}>
            <Icon name={'share-alt'} style={styles.iconStyle2} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center', //vertically centered
    alignSelf: 'stretch',
    width: '95%',
    height: 80,
    padding: 5,
    margin: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
  desc: {
    margin: 5,
    width: '70%',
    alignItems: 'center', //vertically centered
    borderColor: colors.APP_BLUE,
    borderRightWidth: 1,
  },
  desc2: {
    padding: 5,
    width: '85%',
    alignItems: 'center', //vertically centered
    borderColor: colors.APP_BLUE,
    borderRightWidth: 1,
  },
  iconStyle2: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 22,
    margin: 10,
  },
  text: {
    flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colors.APP_BLUE,
    textAlign: 'left',
    height: 25,
  },
});

export default ListLocationItem;
