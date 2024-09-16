import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Define the User interface
interface User {
  name: string;
}

// Define the shape of the auth state
interface AuthState {
  user: User | null;
}

// Define the shape of the overall state
interface RootState {
  auth: AuthState;
}

const Welcome: React.FC = () => {
  // Use the RootState type for the useSelector hook
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        Welcome Back <Text style={styles.strong}>{user ? user.name : 'Guest'}</Text>
      </Text>
    </View>
  );
};

export default Welcome;

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
  },
  strong: {
    fontWeight: 'bold',
  },
});
