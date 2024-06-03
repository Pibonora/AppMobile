// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../telas/Login";
import Registrar from "../telas/Registrar";
import Ambiente from "../telas/Ambiente";
import Home from "../telas/Home";

//  configurar  - <Stack.Screen name="Home" component={Home}/>
const Stack = createStackNavigator();

export default function StackNavigator({user}) {
  return ( 
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registrar" component={Registrar}/>  
      <Stack.Screen name="Ambiente" component={Ambiente} />
      <Stack.Screen name="Home" component={Home}/>   
    </Stack.Navigator>
  )
}