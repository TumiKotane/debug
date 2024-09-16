import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button
        title="Manage Products"
        onPress={() => navigation.navigate('ProductList')}
        color={colors.green}
      />
      <Button
        title="Manage Users"
        onPress={() => navigation.navigate('UserList')}
        color={colors.green}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.beige,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.green,
  },
  button: {
    marginTop: 20,
  },
});

export default Dashboard;
