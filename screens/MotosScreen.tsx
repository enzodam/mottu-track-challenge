import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type Moto = {
  id: string;
  modelo: string;
  placa: string;
  local: string;
  imagem: any;
};

const MotosScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const loadMotos = async () => {
      try {
        const savedMotos = await AsyncStorage.getItem('@motos');
        if (savedMotos) {
          const parsedMotos = JSON.parse(savedMotos) as Moto[];
          const motosComImagem = parsedMotos.map(moto => ({
            ...moto,
            imagem: moto.imagem || require('../assets/motos.png')
          }));
          setMotos(motosComImagem);
        }
      } catch (e) {
        console.error('Erro ao carregar motos:', e);
      }
    };
    loadMotos();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja remover esta moto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            try {
              const updatedMotos = motos.filter(moto => moto.id !== id);
              await AsyncStorage.setItem('@motos', JSON.stringify(updatedMotos));
              setMotos(updatedMotos);
            } catch (e) {
              console.error('Erro ao remover moto:', e);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../assets/patio.png')} 
          style={styles.mapa} 
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Motos no Pátio</Text>
        
        {motos.map((moto: Moto) => (
          <View key={moto.id} style={styles.card}>
            <Image 
              source={moto.imagem} 
              style={styles.motoImage} 
              defaultSource={require('../assets/motos.png')}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.modelo}>{moto.modelo}</Text>
              <Text style={styles.placa}>Placa: {moto.placa}</Text>
              <Text style={styles.local}>Local: {moto.local}</Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDelete(moto.id)}
            >
              <Ionicons name="trash" size={24} color="#ff5555" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  mapa: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  titulo: {
    color: '#00B050',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  motoImage: {
    width: 80,
    height: 60,
    marginRight: 15,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
  },
  modelo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placa: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  local: {
    color: '#00B050',
    fontSize: 14,
    marginTop: 5,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
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

export default MotosScreen;