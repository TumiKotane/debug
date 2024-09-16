import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const FormEditUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    const getUserById = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://192.168.100.6:5000/users/${id}`);
          setName(response.data.name);
          setEmail(response.data.email);
          setRole(response.data.role);
        } catch (error: any) {
          if (error.response) {
            setMsg(error.response.data.msg);
          } else {
            Alert.alert('Error', 'Failed to fetch user details.');
          }
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async () => {
    if (password !== confPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (id) {
      try {
        await axios.patch(`http://192.168.100.6:5000/users/${id}`, { name, email, password, role });
        navigation.navigate('UserList');
      } catch (error: any) {
        if (error.response) {
          setMsg(error.response.data.msg);
        } else {
          Alert.alert('Error', 'Failed to update user.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update User</Text>
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
        <View style={styles.picker}>
          <TouchableOpacity onPress={() => setRole('admin')}>
            <Text style={role === 'admin' ? styles.selectedOption : styles.option}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole('user')}>
            <Text style={role === 'user' ? styles.selectedOption : styles.option}>User</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={updateUser}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 },
  option: { padding: 10 },
  selectedOption: { padding: 10, backgroundColor: '#ddd' },
  button: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorMessage: { color: 'red', marginBottom: 15, textAlign: 'center' },
});

export default FormEditUser;
