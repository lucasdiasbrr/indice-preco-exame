import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import logo from './logo-toledo.png'; // Certifique-se de que o caminho está correto
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const HomeScreen = () => {
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [categoriaProduto, setCategoriaProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [marcaProduto, setMarcaProduto] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [dataRegistro, setDataRegistro] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(produtosList);
    };

    fetchProdutos();
  }, []);

  const formatCurrency = (value) => {
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
    const formattedValue = new Intl.NumberFormat('pt-BR', options).format(value);
    return formattedValue.replace('R$', '').trim();
  };

  const handleValorChange = (text) => {
    let value = text.replace(/[^\d]/g, '');
    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
    }
    setValorProduto(value);
  };

  const handleDataChange = (text) => {
    const value = text.replace(/[^\d]/g, '');
    if (value.length <= 8) {
      let formattedValue = value;
      if (value.length >= 2) {
        formattedValue = value.slice(0, 2) + '/' + value.slice(2);
      }
      if (value.length >= 4) {
        formattedValue = formattedValue.slice(0, 5) + '/' + formattedValue.slice(5);
      }
      setDataRegistro(formattedValue);
    }
  };

  const handleSubmit = async () => {
    if (
      !nomeEstabelecimento ||
      !categoriaProduto ||
      !nomeProduto ||
      !marcaProduto ||
      !unidadeMedida ||
      !valorProduto ||
      !dataRegistro
    ) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const produtoDuplicado = produtos.find(
      (produto) =>
        produto.nomeProduto === nomeProduto &&
        produto.nomeEstabelecimento === nomeEstabelecimento
    );

    if (produtoDuplicado) {
      Alert.alert('Este produto já foi cadastrado.');
      return;
    }

    const novoProduto = {
      nomeEstabelecimento,
      categoriaProduto,
      nomeProduto,
      marcaProduto,
      unidadeMedida,
      valorProduto: formatCurrency(valorProduto),
      dataRegistro,
    };

    try {
      const docRef = await addDoc(collection(db, 'produtos'), novoProduto);
      setProdutos([...produtos, { id: docRef.id, ...novoProduto }]);

      setNomeEstabelecimento('');
      setCategoriaProduto('');
      setNomeProduto('');
      setMarcaProduto('');
      setUnidadeMedida('');
      setValorProduto('');
      setDataRegistro('');
    } catch (error) {
      console.error('Erro ao adicionar produto: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'produtos', id));
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.header}>Cadastro de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Informe o nome do estabelecimento comercial"
        value={nomeEstabelecimento}
        onChangeText={setNomeEstabelecimento}
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a categoria do produto"
        value={categoriaProduto}
        onChangeText={setCategoriaProduto}
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe o nome do produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a marca do produto"
        value={marcaProduto}
        onChangeText={setMarcaProduto}
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a unidade de medida"
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Informe o valor do produto"
        value={`R$ ${valorProduto}`}
        onChangeText={handleValorChange}
        keyboardType="numeric"
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de registro"
        value={dataRegistro}
        onChangeText={handleDataChange}
        keyboardType="numeric"
        placeholderTextColor="#003761"
      />
      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={handleSubmit} color="#d58500" />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>
              {`${item.nomeEstabelecimento}, ${item.categoriaProduto}, ${item.nomeProduto}, ${item.marcaProduto}, ${item.unidadeMedida}, R$ ${item.valorProduto}, ${item.dataRegistro}`}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#003761',
  },
  input: {
    height: 40,
    borderColor: '#003761',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#003761',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flex: 1,
    color: '#003761',
  },
  deleteButton: {
    backgroundColor: '#d58500',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
