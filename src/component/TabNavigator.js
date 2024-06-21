// TabNavigator.js 
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, Ionicons, AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import ButtonNew from './ButtonNew';



{/* <Ionicons name="exit-outline" size={24} color="black" /> */ }

// telas disponivel na rota
import Registrar from "../telas/Registrar";
import Home from "../telas/Home";
import Ambiente from '../telas/Ambiente';
import Login from '../telas/Login';
//
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

// tab menu
const Tab = createBottomTabNavigator();

const SairPrograma = () => {
  signOut(auth);
}

export default function TabNavigator({ user }) {
  //console.log(user);
  const userlogado = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    uid: user.uid,
    accessToken: user.accessToken
  }


  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        borderTopWidth: 1,
        borderColor: '#bababa',
        backgroundColor: '#1f1f21',
        borderTopColor: 'transparent',
      },
      tabBaractiveIntColor: '#fff',
      paddingBottom: 5,
      paddingTop: 5,
    }}>
      <Tab.Screen name="Home" component={Home}
        initialParams={{ userlogado }}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Registro" component={Registrar} options={{
        tabBarLabel: 'Registrar',
        tabBarIcon: ({ color, size }) => (
          <Entypo name="add-user" size={size} color={color} />
        )
      }}
      />
      <Tab.Screen name="Ambiente" component={Ambiente}
        options={{
          tabBarLabel: 'Ambiente',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" size={size} color={color} />
          )
        }} />
      <Tab.Screen name="Sair" component={SairPrograma}
        initialParams={{ userlogado }}
        options={{
          tabBarLabel: 'Sair',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="exit" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};