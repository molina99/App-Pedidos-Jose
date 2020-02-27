import React, { Component } from "react";
import {
  AsyncStorage,
  ImageBackground,
  Text,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";
import axios from "axios";
import { Link } from "react-router-native";

// const API_URL = "http://192.168.100.116:5000/createPersona";
const API_URL = "http://172.16.11.36:5000/createPersona";

export default class Persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: ""
    };
  }

  changeNombre = nombre => {
    this.setState({ nombre });
  };
  changeCorreo = correo => {
    this.setState({ correo });
  };

  saveData = e => {
    if (this.state.nombre === "" || this.state.correo === "") {
      alert("Obligatorio completar todos los campos");
    } else {
      axios
        .post(API_URL, this.state)
        .then(() => {
          AsyncStorage.setItem("nombrePersona", this.state.nombre.toString());
          AsyncStorage.setItem("correoPersona", this.state.correo.toString());
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/fondo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <View>
                <Text style={styles.title}>Registrarse</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí su nombre"
                  value={this.state.nombre}
                  onChangeText={e => this.changeNombre(e)}
                />
                <Text style={styles.label}>Correo:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí su correo"
                  value={this.state.correo}
                  onChangeText={e => this.changeCorreo(e)}
                />
                <TouchableHighlight>
                  <Link
                    to="/menus"
                    onPress={() => {
                      this.saveData();
                    }}
                  >
                    <Text style={styles.btnSave}>Guardar</Text>
                  </Link>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </SafeAreaView>

        <Link to="/" onPress={() => this.asyncstorageClear()}>
          <Text style={styles.btnBack}>VOLVER</Text>
        </Link>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  btnSave: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#67f3ba",
    fontSize: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    borderRadius: 100,
    paddingVertical: 10
  },
  btnBack: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#f3b667",
    fontSize: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    borderRadius: 100,
    paddingVertical: 10,
    marginHorizontal: 50,
    marginBottom: 20
  },
  card: {
    backgroundColor: "#ffffff3d",
    borderRadius: 10,
    width: 310,
    marginHorizontal: 45,
    paddingHorizontal: 40,
    paddingVertical: 30
  },
  container: {
    flex: 1,
    // alignItems: "center",
    marginTop: 30
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  label: {
    fontSize: 24,
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 15
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 10,
    paddingVertical: 10,
    left: 100,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
