import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const FormAddUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [msg, setMsg] = useState<string>('');

  const navigation = useNavigation();

  const saveUser = async () => {
    if (password !== confPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://192.168.100.6:5000/users', { name, email, password, role });
      Alert.alert('Success', 'User added successfully');
      navigation.navigate('UserList');
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        Alert.alert('Error', 'Failed to add user.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      {msg ? <Text style={styles.errorMessage}>{msg}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="******"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confPassword}
          onChangeText={setConfPassword}
          placeholder="******"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="User" value="user" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveUser}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10 },
  picker: { height: 40, width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  button: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorMessage: { color: 'red', marginBottom: 15, textAlign: 'center' },
});

export default FormAddUser;
