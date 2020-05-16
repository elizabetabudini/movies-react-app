import React from 'react';
import {
  StyleSheet,
  AlertStatic as Alert,
  Text,
  ActivityIndicator,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import firebase from '../config/firebase';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import LocationItem from '../components/LocationItem';
import {Drawer} from 'react-native-drawer';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      drawerOpen : false,
    }
  }

  toggleDrawer(){
    this.setState({drawerOpen: ! this.state.drawerOpen})
  }

  onHamburgerClick() {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.view}>
          <Drawer
              open={this.state.drawerOpen}
              type="static"
              tapToClose={true}
              openDrawerOffset={0.5}
              closeDrawerOffset={0}
              content={<SideMenu/>}
              styles={styles.drawer}
              tweenHandler={Drawer.tweenPresets.parallax}
              tweenDuration={400}
              onClose={this.closeDrawer}
          >
        <View>
          <View style = {styles.container}>
            <Header title="Home" toggleDrawer={this.toggleDrawer}/>
          </View>
          <TouchableOpacity onPress={this.onHamburgerClick}>
            <Icon name={'menu'} style={styles.iconStyle2} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  imageStyle: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
export default Header;
