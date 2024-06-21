import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';

const PlaceholderImage = require('../component/image/usuario.png');

const Registrar = ({navigation}) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  const onLoginClick = () => {
    // confere se a senha e iqual a senha de confirmação
    // console.log( '>>> ', (( senha.trim() === '') || ( senha2.trim() === '') ))
    if ( senha.trim() === '' ||  senha2.trim() === '' ) {
      alert("Obrigatorio informar a senha e confirmação, \n tente novamente!")
      return
    }
    if (senha !== senha2) {
       alert("Senha informada estão divergente, \n tente novamente!")
       return
    }
    //
    createUserWithEmailAndPassword( auth, nomeUsuario,  senha)
    .then( (userCredential)=> {
        const user =  userCredential.user;
        //console.log(user)
        //
        navigation.navigate('Login')
    } )
    .catch( (error)=> {
      const errocode = error.code ;
      const errormsg = error.message ;
      // console.log( errocode );
      // console.log( errormsg );
      switch (errocode) {
        case 'auth/email-already-in-use':
          alert( "Email já esta em utilização !") ; 
          return null
        case 'auth/invalid-email':
          alert( "Email invalido!") ; 
          return null 
        default:
          alert( "falha ao registrar o usuario !") ; 
          return null  
      }    
      navigation.navigate('Login')
    } );
     
  }

  const onPressRegister = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}> 
      <Image source={PlaceholderImage} style={styles.image} />   
      <Text style={styles.titulo}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email do usuario" placeholderTextColor="#fff"
        onChangeText={text => setNomeUsuario(text)}
        value={nomeUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a Senha"  placeholderTextColor="#fff"
        onChangeText={text => setSenha(text)}
        value={senha}
        secureTextEntry={true}
      />
       <TextInput
        style={styles.input}
        placeholder="Confirme a Senha" placeholderTextColor="#fff"
        onChangeText={text => setSenha2(text)}
        value={senha2}
        secureTextEntry={true}
      />

      <View >
          <Text style={styles.textoWhite}>Já possui conta?
             <Text style={styles.textoAzul} onPress={onPressRegister}>   Faça o Login
             </Text>
          </Text> 
      </View>

      <TouchableOpacity style={styles.botao} onPress={onLoginClick}>
        <Text style={styles.textoBotao}>Registrar</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f21',
    gap:10,
  
  },
  image: {
    width:'80%',
    height:100,
    resizeMode:"contain",
    
  
  },
  textoWhite:{
    color: '#fff',
  },
  textoAzul:{
    color: '#0170f3',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  titulo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#fff",
    
  },
  input: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",

  },

  botao: {
    backgroundColor: '#0170f3',
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
});

export default Registrar;
