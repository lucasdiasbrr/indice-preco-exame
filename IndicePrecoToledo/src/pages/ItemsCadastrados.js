import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import Header from '../../components/Header';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registros'));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(fetchedItems);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter itens:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'registros', id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      Alert.alert('Sucesso', 'Registro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o registro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o registro.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Itens Cadastrados</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text><Text style={styles.label}>Estabelecimento:</Text> {item.nomeEstabelecimento}</Text>
            <Text><Text style={styles.label}>Categoria:</Text> {item.categoriaProduto}</Text>
            <Text><Text style={styles.label}>Produto:</Text> {item.nomeProduto}</Text>
            <Text><Text style={styles.label}>Marca:</Text> {item.marcaProduto}</Text>
            <Text><Text style={styles.label}>Unidade de Medida:</Text> {item.unidadeMedida}</Text>
            <Text><Text style={styles.label}>Preço:</Text> R$ {item.valorProduto}</Text>
            <Text><Text style={styles.label}>Data de Registro:</Text> {item.dataRegistro}</Text>
            <Button
              title="Excluir"
              onPress={() => handleDeleteItem(item.id)}
              color="#FF5722" // Cor laranja
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default ItemsList;
