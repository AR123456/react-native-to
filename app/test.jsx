import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const ToDoDATA = [
  { id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", title: "First Item" },
  { id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", title: "Second Item" },
  { id: "58694a0f-3da1-471f-bd96-145571e29d72", title: "Third Item" },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Ionicons name="trash-outline" size={24} color="black" />
    </View>
  </View>
);

export default function Index() {
  const [text, onChangeText] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>ToDo List</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Add a todo"
        />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Item title={item.title} onDelete={() => deleteTodo(item.id)} />
          )}
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
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  listContent: {
    width: "100%",
    paddingHorizontal: 16,
  },
  item: {
    marginBottom: 10,
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
  title: {
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
});
