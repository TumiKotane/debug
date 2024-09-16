import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProductScreen from '../screens/ProductScreen';
import UserScreen from '../screens/UserScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const MainStack = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Products" component={ProductScreen} />
          <Stack.Screen name="Users" component={UserScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
