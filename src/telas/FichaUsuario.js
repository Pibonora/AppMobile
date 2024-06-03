import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";

const PlaceholderImage = require('../component/image/usuario.png');

const FichaUsuario = ({navigation}) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  const onLoginClick = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>    
      <Text style={styles.titulo}>Ficha Usuário</Text>
      <View>
         <Text> Foto</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={text => setNomeUsuario(text)}
        value={nomeUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a nova Senha"
        onChangeText={text => setSenha(text)}
        value={senha}
        secureTextEntry={true}
      />
       <TextInput
        style={styles.input}
        placeholder="Confirme a nova Senha"
        onChangeText={text => setSenha2(text)}
        value={senha2}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.botao} onPress={onLoginClick}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    gap:10,
  },
  image: {
    width:'80%',
    height:100,
    resizeMode:"contain",
  
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: 'orange',
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foto : {
    width: '100%',
    height: 90,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: '#ccc000',
    borderRadius: 5,
  }
});

export default FichaUsuario;
