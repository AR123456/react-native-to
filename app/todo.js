//  use local storage for todos -import
import AsyncStorage from "@react-native-async-storage/async-storage";

// asyncstorage will store meals in array with meals key
const TODO_KEY = "todo";
// get todos
// fetch whatever's stored, If so, If nothing's(first launch), returns an empty array []
export const getTodos = async () => {
  const data = await AsyncStorage.getItem(TODO_KEY);
  return data ? JSON.parse(data) : [];
};
// addtodo- create here call elsewhere
export const addTodo = async (
  //loads the existing todo array
  todo,
) => {
  const todos = await getTodos();
  //Builds the new todo object by spreading your input and adding a generated id (current timestamp as a string) and createdAt (ISO date string)
  const newTodo = {
    ...todo,
    //Saves the updated array back — notice [newTodo, ...todos] puts the new todo first, so the list stays newest-first
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(TODO_KEY, JSON.stringify([newTodo, ...todos]));
  //Returns the completed todo object so the caller can use it
  return newTodo;
};

export const editTodo = async (id, updates) => {
  //loads the existing todo array
  const todos = await getTodos();
  //finds the todo and merges in the updates, leaving everything else untouched
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...updates } : todo,
  );
  //saves the updated array back
  await AsyncStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
  //returns the updated todo so the caller can use it
  return updatedTodos.find((todo) => todo.id === id);
};

export const deleteTodo = async (id) => {
  const todos = await getTodos();
  const filtered = todos.filter((todo) => todo.id !== id);
  await AsyncStorage.setItem(TODO_KEY, JSON.stringify(filtered));
};
// clear meals set fresh each day
export const clearAllTodos = async () => {
  await AsyncStorage.removeItem(TODO_KEY);
};
