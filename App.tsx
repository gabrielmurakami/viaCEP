import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  function closeKeyboard() {
    Keyboard.dismiss();
  }

  async function buscar() {
    if (cep === "") {
      alert("Digite um cep válido");
      setCep("");
      return;
    }

    try {
      const response = await api.get(`${cep}/json`);
      Keyboard.dismiss();
      setCepUser(response.data);
    } catch (error) {
      console.log("erro " + error);
    }
  }

  function limpar() {
    setCep("");
    setCepUser(null);
    inputRef.current.focus();
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>Digite o CEP desejado</Text>
          <TextInput
            placeholder="Ex: 12345678"
            keyboardType="numeric"
            value={cep}
            onChangeText={(value) => setCep(value)}
            ref={inputRef}
            style={styles.input}
          />
        </View>
        <View style={styles.areaBtn}>
          <TouchableOpacity
            onPress={buscar}
            style={[styles.botao, { backgroundColor: "#1D75CD" }]}
          >
            <Text style={styles.botaoText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={limpar}
            style={[styles.botao, { backgroundColor: "#CD3E1D" }]}
          >
            <Text style={styles.botaoText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        {cepUser && (
          <View style={styles.resultado}>
            <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
            <Text style={styles.itemText}>
              Logradouro: {cepUser.logradouro}
            </Text>
            <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
            <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
            <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "85%",
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 15,
  },
  botao: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    fontSize: 22,
    color: "#fff",
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  itemText: {
    fontSize: 22,
  },
});
