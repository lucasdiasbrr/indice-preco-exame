import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao fazer login', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003761"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#003761"
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#d58500" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cadastre-se" onPress={() => navigation.navigate('SignUp')} color="#003761" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
    marginVertical: 5,
    width: '100%',
  },
});

export default LoginScreen;
