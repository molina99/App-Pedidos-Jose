import React, { Component } from "react";
import {
  AsyncStorage,
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import axios from "axios";
import { Link } from "react-router-native";
import { RadioButton } from "react-native-paper";

// const API_URL = "http://192.168.100.116:5000/getMenu";
const API_URL = "http://172.16.11.36:5000/getMenu";

export default class Persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      menus: [],
      nombrePersona: "",
      correoPersona: ""
    };
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then(response => {
        this.setState({ menus: response.data.data });
        this.asyncstorageGet();
      })
      .catch(error => {
        console.log(error);
      });
  }

  asyncstorageGet = async () => {
    try {
      const n_persona = await AsyncStorage.getItem("nombrePersona");
      const c_persona = await AsyncStorage.getItem("correoPersona");
      this.setState({ nombrePersona: n_persona });
      this.setState({ correoPersona: c_persona });
    } catch (e) {
      alert(e);
    }
  };

  asyncstorageSave_idMenu = async item => {
    try {
      await AsyncStorage.setItem("idmenu", item.toString()).then(() => {
        this.props.history.push("/buyMenu")
      });
    } catch (err) {
      alert(err);
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ nombrePersona: "" });
      this.setState({ correoPersona: "" });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    const { menus, checked, nombrePersona } = this.state;
    return (
      <ImageBackground
        source={require("../../assets/fondo.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <View>
              <View>
                <Text style={styles.title}>Hola {nombrePersona}</Text>
                <Text style={styles.title2}>Escoge un menú</Text>
              </View>
              <View style={styles.scroll}>
                <ScrollView>
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
                      <View style={styles.btnRadio}>
                        <Text style={styles.label}>Seleccionar:</Text>
                        <RadioButton
                          value={element.id}
                          status={
                            checked === element.id ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            this.setState({ checked: element.id }),
                              this.asyncstorageSave_idMenu(element.id);
                          }}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
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
  btnRadio: {
    flexDirection: "row"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 310,
    marginHorizontal: 45,
    paddingHorizontal: 40,
    paddingVertical: 30,
    marginBottom: 20
  },
  container: {
    flex: 1,
    marginTop: 30
  },
  item: {
    fontSize: 20,
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 15
  },
  label: {
    fontSize: 25,
    textShadowColor: "#709aff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 11,
    marginBottom: 15
  },
  scroll: {
    marginBottom: 450
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 10,
    paddingVertical: 10,
    left: 90,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  title2: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
    paddingVertical: 10,
    left: 80,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
