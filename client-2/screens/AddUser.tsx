import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Redux
import { useNavigation, NavigationProp } from '@react-navigation/native'; // React Navigation for navigation
import { getMe } from '../redux/authSlice'; // Import your Redux slice
import Layout from '../screens/Layout'; // Assuming you have a Layout component for mobile
import FormAddUser from '../components/FormAddUser'; // Form component to add a user
import { RootState } from '../redux/store'; // Import RootState type from your Redux store

const AddUser: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>(); // React Navigation for navigating between screens
  const { isError, user } = useSelector((state: RootState) => state.auth); // Get the auth state from Redux

  // Fetch user data and check authentication
  useEffect(() => {
    dispatch(getMe()); // Fetch current user authentication status

    if (isError) {
      Alert.alert('Error', 'Authentication failed. Redirecting to login.');
      navigation.navigate('Login'); // Navigate to the login page
    }

    if (user && user.role !== 'Admin') {
      Alert.alert('Access Denied', 'Only admins can access this page. Redirecting to dashboard.');
      navigation.navigate('Dashboard'); // Redirect to dashboard if the user is not an admin
    }
  }, [isError, user, navigation, dispatch]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <FormAddUser />
      </ScrollView>
    </Layout>
  );
};

// Styling for the container
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background color
  },
});

export default AddUser;
