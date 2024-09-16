import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native'; // React Native components
import Layout from './Layout';
import FormEditProduct from '../components/FormEditProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // React Navigation for navigation
import { AppDispatch, RootState } from '../redux/store'; // Import types from your store
import { getMe } from '../redux/authSlice';

const EditProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation(); // For navigation in React Native

  const { isError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigation.navigate('Home'); // Replace '/' with the name of your "Home" screen
    }
  }, [isError, navigation]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <FormEditProduct />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background color
  },
});

export default EditProduct;
