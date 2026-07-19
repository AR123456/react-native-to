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

// DATA will be todos for testing
const ToDoDATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
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
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  </View>
);
export default function Index() {
  // getter setter
  const [text, onChangeText] = useState("Add a todo");
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>ToDO List</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <FlatList
          data={ToDoDATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
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
  item: {
    backgroundColor: "#f9c2ff",
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 600,
    height: 100,
    marginBottom: 10,
    borderStyle: "solid",
    // borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: "auto",
  },
});
