import React, { Component } from "react";
import {
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

// const API_URL = "http://192.168.100.116:5000/createMenu";
const API_URL = "http://172.16.11.36:5000/createMenu";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      foto: "",
      descripcion: "",
      precio: "",
      fecha: ""
    };
  }

  changeNombre = nombre => {
    this.setState({ nombre });
  };
  changeDescripcion = descripcion => {
    this.setState({ descripcion });
  };
  changePrecio = precio => {
    this.setState({ precio });
  };
  changeFecha = fecha => {
    this.setState({ fecha });
  };

  encodeImageFileAsURL = e => {
    const reader = new FileReader();
    const file = new Blob([e.target.value], { type: "img/png" });
    this.setState({ foto: file });
    reader.onloadend = e => {
      this.setState({ foto: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  onFileChange = e => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ foto: reader.result });
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  saveData = e => {
    if (
      this.state.nombre === "" ||
      //   this.state.foto === "" ||
      this.state.descripcion === "" ||
      this.state.precio === "" ||
      this.state.fecha === ""
    ) {
      alert("Obligatorio completar todos los campos");
    } else {
      axios
        .post(API_URL, this.state)
        .then(response => {})
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
                <Text style={styles.title}>Agregar Menú</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.label}>Producto:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí el producto"
                  value={this.state.nombre}
                  onChangeText={e => this.changeNombre(e)}
                />
                <Text style={styles.label}>Descripción:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí la descripción"
                  value={this.state.descripcion}
                  onChangeText={e => this.changeDescripcion(e)}
                />
                <Text style={styles.label}>Precio:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí el precio"
                  value={this.state.precio}
                  onChangeText={e => this.changePrecio(e)}
                />
                <Text style={styles.label}>Fecha:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí la fecha"
                  value={this.state.fecha}
                  onChangeText={e => this.changeFecha(e)}
                />
                <TouchableHighlight>
                  <Link
                    to="/"
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

        <Link to="/">
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
    paddingHorizontal: 70,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
