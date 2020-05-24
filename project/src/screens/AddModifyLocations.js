import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ListLocationItem from '../components/ListLocationItem';
import colors from '../config/colors';
import FormTextInput from '../components/FormTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {manageItem} from '../storage/firebaseFunctions';

class AddModifyLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLocation: '',
      buttonText: 'Add to Film Tourist database',
      oldLocation: '',
    };
  }
  render() {
    var firebaseKey = this.props.navigation.state.params.firebaseKey;
    var movie = this.props.navigation.state.params.movie;
      console.log('AddModify.js -> firebase key: ', firebaseKey);
    return (
      <View style={{backgroundColor: colors.APP_BLUE}}>
        <FlatList
          data={Object.values(movie.filmingLocations)}
          keyExtractor={item => item.location}
          initialNumToRender={20}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  newLocation: item.location,
                  buttonText: 'Update Film Tourist database',
                  oldLocation: item.location,
                })
              }>
              <ListLocationItem
                item={item}
                movieDetails={movie}
                modify={true}
                firebaseKey={firebaseKey}
                navigation={this.props.navigation}
              />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.locations}>
              <Text style={styles.textStyle}>
                Contribute to our locations database for: {movie.title} (
                {movie.year})
              </Text>
              <View
                style={{
                  backgroundColor: colors.WHITE,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text style={styles.textStyle2}>Input location</Text>
                <FormTextInput
                  style={styles.input}
                  iconName={'map-marker-plus'}
                  value={this.state.newLocation}
                  onChangeText={newLocation => this.setState({newLocation})}
                  placeholder={'Example: 31, Colmore Row, Birmingham, UK'}
                  autoCorrect={false}
                  placeholderTextColor="grey"
                />
                <View style={{flexDirection: 'row'}}>
                  <Icon.Button
                    style={styles.button}
                    name="check"
                    backgroundColor="green"
                    onPress={() =>
                      manageItem(
                        this.state.newLocation,
                        this.state.oldLocation,
                        firebaseKey,
                        'modify',
                      ).then(this.props.navigation.goBack)
                    }>
                    {this.state.buttonText}
                  </Icon.Button>
                  <Icon.Button
                    style={styles.button}
                    name="trash"
                    backgroundColor="red"
                    onPress={() =>
                      this.setState({
                        newLocation: '',
                        buttonText: 'Add to Film Tourist database',
                        oldLocation: '',
                      })
                    }>
                    Undo
                  </Icon.Button>
                </View>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
  locations: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.APP_BLUE,
  },
  textStyle: {
    color: colors.WHITE,
    fontSize: 20,
    textAlign: 'justify',
    margin: 10,
  },
  textStyle2: {
    color: colors.APP_BLUE,
    fontSize: 20,
    textAlign: 'justify',
    margin: 10,
  },
});

export default AddModifyLocations;
