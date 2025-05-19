import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdicionarMotoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [moto, setMoto] = useState({
    modelo: '',
    placa: '',
    local: ''
  });

  const handleSalvar = async () => {
    if (!moto.modelo || !moto.placa || !moto.local) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const savedMotos = await AsyncStorage.getItem('@motos');
      const motos = savedMotos ? JSON.parse(savedMotos) : [];
      
      const novaMoto = {
        id: Date.now().toString(),
        modelo: moto.modelo,
        placa: moto.placa,
        local: moto.local,
        imagem: require('../assets/motos.png')
      };

      await AsyncStorage.setItem('@motos', JSON.stringify([...motos, novaMoto]));
      navigation.navigate('Home');
    } catch (e) {
      alert('Erro ao salvar moto!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={moto.modelo}
          onChangeText={(text) => setMoto({...moto, modelo: text})}
          placeholder="Ex: Honda Biz 125"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={styles.input}
          value={moto.placa}
          onChangeText={(text) => setMoto({...moto, placa: text})}
          placeholder="Ex: ABC-1234"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Localização</Text>
        <TextInput
          style={styles.input}
          value={moto.local}
          onChangeText={(text) => setMoto({...moto, local: text})}
          placeholder="Ex: Setor A, Vaga 12"
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.botaoSalvar}
            onPress={handleSalvar}
          >
            <Text style={styles.textoBotao}>Salvar Moto</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoCancelar}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  botaoSalvar: {
    backgroundColor: '#00B050',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoCancelar: {
    backgroundColor: '#ff5555',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdicionarMotoScreen;