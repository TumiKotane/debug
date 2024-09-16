import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// User interface
interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store users
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch users from the API
  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://192.168.100.6:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      Alert.alert("Error", "Failed to fetch users.");
    }
  };

  // Delete a user
  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://192.168.100.6:5000/users/${userId}`);
      Alert.alert("Success", "User deleted successfully.");
      getUsers(); // Refresh users list after deletion
    } catch (error) {
      console.error("Failed to delete user", error);
      Alert.alert("Error", "Failed to delete user.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <Button title="Add New" onPress={() => navigation.navigate("AddUser")} />

      <FlatList
        data={users}
        keyExtractor={(user) => user.uuid}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userDetails}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.role}</Text>
            </View>

            <View style={styles.userActions}>
              <TouchableOpacity onPress={() => navigation.navigate("EditUser", { userId: item.uuid })}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(item.uuid)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  userItem: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#eee", marginVertical: 5 },
  userDetails: { flex: 1 },
  userActions: { flexDirection: "row" },
  editText: { color: "blue", marginRight: 15 },
  deleteText: { color: "red" },
});

export default UserList;
