import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";

import Home from "./src/screens/home";
import FormMenu from "./src/screens/formMenu";
import FormPersona from "./src/screens/formPersona";
import Menus from "./src/screens/menus";
import BuyMenu from "./src/screens/buyMenu";

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forMenu" component={FormMenu} />
            <Route exact path="/forPersona" component={FormPersona} />
            <Route exact path="/menus" component={Menus} />
            <Route exact path="/buyMenu" component={BuyMenu} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
