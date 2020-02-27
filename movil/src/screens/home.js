import React, { Component } from "react";
import { Link } from "react-router-native";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/fondo.jpg")}
      >
        <View style={styles.header}>
          <Link to="/forMenu">
            <Image
              style={styles.add}
              source={require("../../assets/add.png")}
            />
          </Link>
        </View>
        <View style={styles.footer}>
          <Link to="/forPersona">
            <Image
              style={styles.login}
              source={require("../../assets/login.png")}
            />
          </Link>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  header: {
    top: 200,
    left: 50
  },
  footer: {
    top: 300,
    left: 50
  },
  add: {
    width: 300,
    height: 100
  },
  login: {
    width: 300,
    height: 100
  }
});
