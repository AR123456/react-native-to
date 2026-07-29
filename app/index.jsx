import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getTodos, addTodo, clearAllTodos, editTodo } from "./todo";

// Item will be a todo item
const Item = ({ title, onEdit }) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.actions}>
        <Ionicons name="pencil" size={24} color="#555" onPress={onEdit} />
        <Ionicons name="trash-outline" size={22} color="#555" />
      </TouchableOpacity>
    </View>
  </View>
);
export default function Index() {
  // getters setters
  const [todos, setTodos] = useState([]);

  const [text, onChangeText] = useState("");
  // getter setter for editing the todo
  const [editingId, setEditingId] = useState(null);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();
    console.log(loadedTodos, "loaded todos");
    setTodos(loadedTodos);
  };
  useEffect(() => {
    loadTodos();
  }, []);
  const handleAddTodo = async () => {
    if (!text) {
      Alert.alert("Error", "Please enter a todo.");
      return;
    }
    await addTodo({ title: text });
    // clear the input
    onChangeText("");
    // refresh from local storage list

    await loadTodos();
    // Haptics notification
    Alert.alert(text);
  };
  const handleEditTodo = async (id, currentTitle) => {
    // put the title being edited into the text input
    setEditingId(id);
    onChangeText(currentTitle);
  };
  //  handle add or edit
  const handleSubmit = async () => {
    if (!text) {
      Alert.alert("Error", "Please enter a todo.");
      return;
    }
    if (editingId) {
      await editTodo(editingId, { title: text });
      setEditingId(null);
    } else {
      await addTodo({ title: text });
    }
    onChangeText("");
    await loadTodos();
  };
  const handleClearAllTodos = async () => {
    await clearAllTodos();
    await loadTodos();
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>ToDO List</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Add a todo"
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />

          <TouchableOpacity onPress={handleSubmit}>
            <Ionicons
              name={editingId ? "checkmark-circle" : "add-circle"}
              size={34}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              onEdit={() => handleEditTodo(item.id, item.title)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
        <View>
          <Text style={styles.header}>Nuclear option done all todos!</Text>
          <TouchableOpacity style={styles.header} onPress={handleClearAllTodos}>
            <Ionicons name="trash" size={34} color="#f30909" paddingTop={14} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    alignSelf: "center",
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    flexShrink: 1,
  },
  input: {
    height: 40,
    width: "85%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
  },
  listContent: {
    width: "100%",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  },
});
