import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import Forecast from './components/Forecast';

class App extends Component {
  constructor(props) {
    super();
    this.state = {zip: '', forecast: null};
  }
  _handleTextChange = event => {
    this.setState({zip: event.nativeEvent.text});
  };
  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>You input {this.state.zip}.</Text>
        <TextInput
          style={styles.input}
          onSubmitEditing={this._handleTextChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*export default (App = () => {
  const [isLoading, setLoading] = useState(true);
  const [moviedata, setData] = useState([]);

  useEffect(() => {
    fetch('https://filmproject-87d6c.firebaseio.com/.json')
      .then(response => response.json())
      .then(json => setData(json.movies))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  });

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={moviedata}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.year}
            </Text>
          )}
        />
      )}
    </View>
  );
});*/
export default App;
