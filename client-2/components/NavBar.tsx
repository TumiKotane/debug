import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type for your navigation stack
type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

// Define props for the NavBar component
type NavBarProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const NavBar: React.FC<NavBarProps> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

export default NavBar;
