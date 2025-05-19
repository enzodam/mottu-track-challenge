import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracoesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [notificacoes, setNotificacoes] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const value = await AsyncStorage.getItem('notificacoes');
        if (value !== null) setNotificacoes(JSON.parse(value));
      } catch (e) {
        console.error('Erro ao carregar:', e);
      }
    };
    loadSettings();
  }, []);

  const toggleSwitch = async () => {
    try {
      const novoValor = !notificacoes;
      setNotificacoes(novoValor);
      await AsyncStorage.setItem('notificacoes', JSON.stringify(novoValor));
    } catch (e) {
      console.error('Erro ao salvar:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Ativar Notificações</Text>
        <Switch
          value={notificacoes}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#767577', true: '#00B050' }}
          thumbColor={notificacoes ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
  },
  footer: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
  },
  botaoVoltar: {
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

export default ConfiguracoesScreen;