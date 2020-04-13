import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function PasswordTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name="key" style={styles.iconStyle}></Icon>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.inputStyle}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(235,235,235,1)",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    color: "#616161",
    fontFamily: "Roboto",
    fontSize: 24,
    paddingLeft: 8
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    marginLeft: 16,
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  }
});

export default PasswordTextbox;
