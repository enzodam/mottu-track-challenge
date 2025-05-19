import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AdicionarMotoScreen from './screens/AdicionarMotoScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import MotosScreen from './screens/MotosScreen';
import SobreScreen from './screens/SobreScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Motos: undefined;
  AdicionarMoto: undefined;
  Configuracoes: undefined;
  Sobre: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Motos" component={MotosScreen} />
        <Stack.Screen name="AdicionarMoto" component={AdicionarMotoScreen} />
        <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
        <Stack.Screen name="Sobre" component={SobreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}