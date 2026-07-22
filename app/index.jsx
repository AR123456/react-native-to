import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getTodos } from "@todo";
// DATA will be todos for testing
const ToDoDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title:
      "Second Item this is a really long to do it may take up more than one line",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

// Item will be a todo item
const Item = ({ title }) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <Ionicons name="pencil" size={24} color="#555" />
        <Ionicons name="trash-outline" size={22} color="#555" />
      </View>
    </View>
  </View>
);
export default function Index() {
  // getters setters
  const [todos, setTodos] = useState();
  const loadTodos= async()={
    const data = await getTodos();
    setTodos(data);
  }
  const [text, onChangeText] = useState("Add a todo");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>ToDO List</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <FlatList
          data={ToDoDATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
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
    width: "90%",
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
