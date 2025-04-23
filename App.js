import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./components/ChatScreen";
import LoginScreen from "./components/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  const [username, setUsername] = useState("");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={username ? "Chat" : "Login"}>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={setUsername} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {props => <ChatScreen {...props} username={username} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
