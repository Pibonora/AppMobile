// src/telas/Home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation, route }) => {
  const nome = route.params?.userlogado?.displayName;
  const email = route.params?.userlogado?.email;
  const emailVerified = route.params?.userlogado?.emailVerified;
  const phoneNumber = route.params?.userlogado?.phoneNumber;
  const photoURL = route.params?.userlogado?.photoURL;
  const uid = route.params?.userlogado?.uid;
  const accessToken = route.params?.userlogado?.accessToken;

  const AmbienteClick = () => {
    navigation.navigate('Ambiente');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainColor}>Edu</Text>
        <Text style={styles.titulo}>Quest</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.textPadrao}>Crie seu ambiente e comece a estudar com a gente!</Text>
        <Text style={styles.text2}>Criação ➡ Revisão ➡ Estudo constante</Text>

        <TouchableOpacity style={styles.botao} onPress={AmbienteClick}>
          <Text style={styles.textoBotao}>Ambiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f21',
  },
  header: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 50,
    marginBottom: -100,
  },
  mainColor: {
    color: '#0170f3',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  conteudo: {
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPadrao: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  text2: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#0170f3',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
