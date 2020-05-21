import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  onHamburgerClick() {
    this.props.toggleDrawer();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onHamburgerClick}>
        <Icon name={'menu'} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: colors.APP_BLUE,
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 8,
  },
});
export default Header;
