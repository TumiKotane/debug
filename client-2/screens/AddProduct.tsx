import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import { useNavigation, NavigationProp } from '@react-navigation/native'; // React Navigation for navigation
import { getMe } from '../redux/authSlice'; // Redux slice for authentication
import Layout from './Layout'; // Custom layout component
import FormAddProduct from '../components/FormAddProduct'; // Form component for adding product
import { RootState, AppDispatch } from '../redux/store'; // Import RootState and AppDispatch types from Redux store

const AddProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Dispatch typed with AppDispatch
  const navigation = useNavigation<NavigationProp<any>>(); // Use navigation with proper typing from React Navigation
  const { isError } = useSelector((state: RootState) => state.auth); // Get authentication error state from Redux

  // Fetch user authentication data
  useEffect(() => {
    dispatch(getMe()); // Dispatch getMe action to check authentication
  }, [dispatch]);

  // Handle authentication error, navigate to login if necessary
  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'You are not authenticated. Redirecting to login.');
      navigation.navigate('Login'); // Navigate to login screen if unauthenticated
    }
  }, [isError, navigation]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <FormAddProduct />
      </ScrollView>
    </Layout>
  );
};

export default AddProduct;

// Define styles for the container
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});
