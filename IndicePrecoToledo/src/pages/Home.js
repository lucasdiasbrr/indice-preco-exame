import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native'; 
import Header from '../../components/Header'; 
import { getAuth, signOut } from 'firebase/auth';

const Home = () => {
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [categoriaProduto, setCategoriaProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [marcaProduto, setMarcaProduto] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');

  const navigation = useNavigation(); 

  const handleNavigateToItems = () => {
    navigation.navigate('ItemsCadastrados');
  };

  const isFormValid = () => {
    return (
      nomeEstabelecimento.trim() !== '' &&
      categoriaProduto.trim() !== '' &&
      nomeProduto.trim() !== '' &&
      marcaProduto.trim() !== '' &&
      unidadeMedida.trim() !== '' &&
      valorProduto.trim() !== '' &&
      dataRegistro.trim() !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const registrosRef = collection(db, 'registros');

      const docRef = await addDoc(registrosRef, {
        nomeEstabelecimento,
        categoriaProduto,
        nomeProduto,
        marcaProduto,
        unidadeMedida,
        valorProduto,
        dataRegistro
      });

      setNomeEstabelecimento('');
      setCategoriaProduto('');
      setNomeProduto('');
      setMarcaProduto('');
      setUnidadeMedida('');
      setValorProduto('');
      setDataRegistro('');

      Alert.alert('Sucesso', 'Registro cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar documento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
    }
  };

  const handleLogout = () => {
    const auth = getAuth(); 
    signOut(auth)
      .then(() => {
        console.log('Usuário desconectado com sucesso');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Erro ao desconectar:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer logout.');
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Estabelecimento"
        value={nomeEstabelecimento}
        onChangeText={setNomeEstabelecimento}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria do Produto"
        value={categoriaProduto}
        onChangeText={setCategoriaProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca do Produto"
        value={marcaProduto}
        onChangeText={setMarcaProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Unidade de Medida"
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor do Produto"
        value={valorProduto}
        onChangeText={setValorProduto}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Registro"
        value={dataRegistro}
        onChangeText={setDataRegistro}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Enviar"
          onPress={handleSubmit}
          color="#4CAF50" 
        />
        <Button
          title="Visualizar Itens Cadastrados"
          onPress={handleNavigateToItems}
          color="#2196F3" 
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#FF5722" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
  },
});

export default Home;
