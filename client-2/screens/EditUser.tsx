import React, { useEffect } from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // For React Native navigation
import { AppDispatch, RootState } from '../redux/store'; // Import types from your store
import { getMe } from '../redux/authSlice';

const EditUser: React.FC = () => {
  // Typed useDispatch hook
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation(); // For navigation

  // Typed useSelector hook
  const { isError, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigation.navigate('Home'); // Replace '/' with relevant screen name
    }
    if (user && user.role !== 'Admin') {
      navigation.navigate('Dashboard'); // Replace with your target screen name
    }
  }, [isError, user, navigation]);

  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;
