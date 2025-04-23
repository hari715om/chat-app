import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";

export default function LoginScreen({ navigation, onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);            
      navigation.navigate("Chat");   
    } else {
      Alert.alert("Please enter a username");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter Your Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={{
          borderWidth: 1,
          width: "80%",
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Join Chat" onPress={handleLogin} />
    </View>
  );
}
