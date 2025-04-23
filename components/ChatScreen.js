import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { io } from "socket.io-client";

export default function ChatScreen({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.29.176:3000");

    socket.current.on("connect", () => {
      console.log("✅ Connected to server:", socket.current.id);
      socket.current.emit("join", username);
    });

    socket.current.on("receiveMessage", (msg) => {
      console.log("📥 Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.current.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    socket.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgObj = {
        user: username,
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      console.log("📤 Sending message:", msgObj);
      socket.current.emit("sendMessage", msgObj);
      setMessage("");
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user === username;
    const isSystemMsg = item.user === "System";

    if (isSystemMsg) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.message}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.rightBubble : styles.leftBubble,
        ]}
      >
        <Text style={styles.senderName}>{item.user}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={styles.textInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  leftBubble: {
    backgroundColor: "#e0f7fa",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  rightBubble: {
    backgroundColor: "#c8e6c9",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#555",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  systemMessageContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  systemMessageText: {
    fontStyle: "italic",
    color: "#888",
    backgroundColor: "#f1f1f1",
    padding: 6,
    borderRadius: 10,
    textAlign: "center",
    maxWidth: "80%",
  },
});
