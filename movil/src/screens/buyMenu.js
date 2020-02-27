import React, { Component } from "react";
import {
  AsyncStorage,
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import { Link } from "react-router-native";

// const API_URL = "http://192.168.100.116:5000/createPedido";
const API_QUERY = "http://172.16.11.36:5000/query1";
const API_URL = "http://172.16.11.36:5000/createPedido";
const API_URL_MENU = "http://172.16.11.36:5000/getMenu";

export default class Persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      idpersona: "",
      idmenu: "",
      cantidad: "",
      menus: [],
      persona: []
    };
  }

  asyncstorageGetCorreo = async () => {
    try {
      const co_persona = await AsyncStorage.getItem("correoPersona");
      this.setState({ correo: co_persona });
    } catch (e) {
      alert(e);
    }
  };

  getData = () => {
    axios
      .get(`${API_URL_MENU}?id=${this.state.idmenu}`)
      .then(response => {
        this.setState({ menus: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`${API_QUERY}?correo=${this.state.correo}`)
      .then(response => {
        this.setState({ persona: response.data.data });
        console.log(persona);
      })
      .catch(error => {
        console.log(error);
      });
  };

  asyncstorageGet = async () => {
    try {
      const i_menu = await AsyncStorage.getItem("idmenu");
      this.setState({ idmenu: i_menu });
      this.getData();
    } catch (e) {
      alert(e);
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ idmenu: "" });
    } catch (e) {
      alert(e);
    }
  };

  componentDidMount() {
    this.asyncstorageGetCorreo();
    this.asyncstorageGet();
  }

  handleBuyMenu = text => {
    this.setState({ cantidad: text });
  };

  // saveData = () => {
  //   this.post = {
  //     idpersona: this.state.idpersona,
  //     idmenu: this.state.idmenu,
  //     cantidad: this.state.cantidad
  //   };
  //   if (
  //     this.post.idpersona === "" ||
  //     this.post.idmenu === "" ||
  //     this.post.cantidad === ""
  //   ) {
  //     alert("Obligatorio completar todos los campos");
  //   } else {
  //     axios
  //       .post(API_URL, this.post)
  //       .then(response => {
  //         if (response.data.ok === true) {
  //           alert("Pedido realizado exitosamente");
  //         }
  //       })
  //       .catch(error => {
  //         alert(error);
  //       });
  //   }
  // };

  render() {
    const { menus } = this.state;
    return (
      <ImageBackground
        source={require("../../assets/fondo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <View>
                <Text style={styles.title}>Haz tu compra</Text>
              </View>
              <View style={styles.scroll}>
                {menus.map(element => (
                  <View style={styles.card}>
                    <Text style={styles.label}>Producto:</Text>
                    <Text style={styles.item}>{element.nombre}</Text>
                    <Text style={styles.label}>Descripcion:</Text>
                    <Text style={styles.item}>{element.descripcion}</Text>
                    <Text style={styles.label}>Precio:</Text>
                    <Text style={styles.item}>{element.precio} $</Text>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.item}>{element.fecha}</Text>
                    <Text style={styles.label2}>
                      Ingresa cuántos pedidos deseas:
                    </Text>
                    <TextInput
                      placeholder="Ingrese número de pedidos"
                      underlineColorAndroid="transparent"
                      style={styles.input}
                      keyboardType={"numeric"}
                      onChangeText={this.handleBuyMenu}
                    />
                    <TouchableHighlight>
                      <Link
                        to="/menus"
                        // onPress={() => {
                        //   this.saveData();
                        // }}
                      >
                        <Text style={styles.btnSave}>Enviar</Text>
                      </Link>
                    </TouchableHighlight>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>

        <Link to="/menus" onPress={() => this.asyncstorageClear()}>
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
  label2: {
    fontSize: 20,
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 15,
    marginTop: 15
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 10,
    paddingVertical: 10,
    left: 70,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
