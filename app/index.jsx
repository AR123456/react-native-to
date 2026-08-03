import { useState, useEffect, useRef } from "react";
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
import {
  getTodos,
  addTodo,
  clearAllTodos,
  editTodo,
  deleteTodo,
} from "../lib/todo";
import Item from "../components/Item";

// Item will be a todo item
// const Item = ({ title, onEdit, onDelete }) => (
//   <View style={styles.item}>
//     <View style={styles.row}>
//       <Text style={styles.title}>{title}</Text>
//       <TouchableOpacity style={styles.actions}>
//         <Ionicons name="pencil" size={24} color="#555" onPress={onEdit} />
//         <Ionicons
//           name="trash-outline"
//           size={22}
//           color="#555"
//           onPress={onDelete}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// );
export default function Index() {
  // getters setters
  const [todos, setTodos] = useState([]);

  const [text, onChangeText] = useState("");
  // getter setter for editing the todo
  const [editingId, setEditingId] = useState(null);

  const inputRef = useRef(null);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();
    // console.log(loadedTodos, "loaded todos");
    setTodos(loadedTodos);
  };
  useEffect(() => {
    loadTodos();
  }, []);

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
  const handleEditTodo = async (id, currentTitle) => {
    // put the title being edited into the text input
    setEditingId(id);
    onChangeText(currentTitle);
    // "if the input is mounted, grab focus on it" — safely, without crashing if it somehow isn't ready yet.
    inputRef.current?.focus();
  };
  //in case user wants to cancel the edit
  const handleCancelEdit = () => {
    setEditingId(null);
    onChangeText("");
  };
  const handleClearAllTodos = async () => {
    await clearAllTodos();
    await loadTodos();
  };
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    await loadTodos();
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>ToDO List</Text>
        <View style={styles.row}>
          {/* wrapper for input border */}
          <View
            style={[
              styles.inputWrapper,
              editingId && styles.inputWrapperEditing,
            ]}
          >
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Add a todo"
              onChangeText={onChangeText}
              value={text}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              underlineColorAndroid="transparent"
            />
          </View>

          {editingId && (
            <TouchableOpacity onPress={handleCancelEdit}>
              <Ionicons name="close-circle" size={34} color="#999" />
            </TouchableOpacity>
          )}
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
              onDelete={() => handleDeleteTodo(item.id)}
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
    marginTop: 28,
    alignSelf: "center",
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    flexShrink: 1,
  },

  listContent: {
    width: "100%",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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

  inputWrapper: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
  },
  inputWrapperEditing: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 25,
  },
  input: {
    height: 40,
    padding: 10,
    // removing the extra border in web view
    borderWidth: 0,
    outlineStyle: "none",
  },
});
