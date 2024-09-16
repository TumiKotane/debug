import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; // React Navigation for mobile

// Define an interface for product data
interface Product {
  name: string;
  price: string;
}

const FormEditProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string }; // Extract id from route params

  useEffect(() => {
    const getProductById = async () => {
      if (id) {
        try {
          const response = await axios.get<Product>(`http://192.168.100.6:5000/products/${id}`); // Update URL if necessary
          setName(response.data.name);
          setPrice(response.data.price);
        } catch (error: any) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async () => {
    if (id) {
      try {
        await axios.patch(`http://192.168.100.6:5000/products/${id}`, {
          name,
          price,
        });
        navigation.navigate('ProductList'); // Navigate to the ProductList screen
      } catch (error: any) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      {msg ? <Text style={styles.errorMessage}>{msg}</Text> : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Product Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateProduct}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FormEditProduct;
