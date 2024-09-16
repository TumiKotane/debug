import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Define the navigation type for React Navigation
type RootStackParamList = {
  UserList: undefined;
  Dashboard: undefined;
  Products: undefined;
};

const SideBar: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Type navigation object

  return (
    <View style={styles.sidebar}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Users"
            onPress={() => {
              console.log('Navigating to UserList');
              navigation.navigate('UserList');
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Dashboard"
            onPress={() => {
              console.log('Navigating to Dashboard');
              navigation.navigate('Dashboard');
            }}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Products"
            onPress={() => {
              console.log('Navigating to Products');
              navigation.navigate('Products');
            }}
          />
        </View>
      </View>
    </View>
  );
};

// Define the styles for the sidebar and buttons
const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 100,
    bottom: 0,
    width: 200,
    padding: 10,
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start', // Align buttons to the top
  },
  buttonContainer: {
    flexDirection: 'column',
    flex: 1, // Ensures the buttons layout properly
  },
  buttonWrapper: {
    marginBottom: 15, // Adds spacing between buttons
  },
});

export default SideBar;
