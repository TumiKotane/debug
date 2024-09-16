import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native'; // React Navigation
import axios from "axios";


// Define types for your product and user
interface User {
  name: string;
}

interface Product {
  uuid: string;
  name: string;
  price: string; // Adjust type as needed (e.g., number if prices are numeric)
  user: User;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation(); // Navigation object from React Navigation

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get<Product[]>("http://192.168.100.6:5000/products"); // Update with your server IP/endpoint
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      Alert.alert("Error", "Failed to fetch products");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://192.168.100.6:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      Alert.alert("Error", "Failed to delete product");
    }
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <View style={styles.productRow}>
      <Text style={styles.text}>{index + 1}. {item.name}</Text>
      <Text style={styles.text}>Price: {item.price}</Text>
      <Text style={styles.text}>Created by: {item.user.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProduct', { productId: item.uuid })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProduct(item.uuid)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Button title="Add New" onPress={() => navigation.navigate('AddProduct')} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.uuid}
        renderItem={renderProduct}
      />
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductList;
