import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const SobreScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const abrirGitHub = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Erro ao abrir link:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre o Mottu Track</Text>
      
      <Image 
        source={require('../assets/Logo.jpg')} 
        style={styles.logo} 
      />

      <Text style={styles.descricao}>
        Sistema de gerenciamento de pátio desenvolvido para o desafio acadêmico da Mottu.
      </Text>

      <Text style={styles.subtitulo}>Desenvolvedores:</Text>
      
      <TouchableOpacity onPress={() => abrirGitHub('https://github.com/enzodam')}>
        <Text style={styles.criador}>
          Enzo Dias Alfaia Mendes{"\n"}
          RM: 558438{"\n"}
          GitHub: enzodam
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => abrirGitHub('https://github.com/MatheusReis48')}>
        <Text style={styles.criador}>
          Matheus Henrique Germano Reis{"\n"}
          RM: 555861{"\n"}
          GitHub: MatheusReis48
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => abrirGitHub('https://github.com/lds2125')}>
        <Text style={styles.criador}>
          Luan Dantas dos Santos{"\n"}
          RM: 559004{"\n"}
          GitHub: lds2125
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  titulo: {
    color: '#00B050',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  descricao: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitulo: {
    color: '#00B050',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  criador: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 22,
  },
  botaoVoltar: {
    backgroundColor: '#ff5555',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SobreScreen;