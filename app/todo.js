//  use local storage for todos
import AsyncStorage from "@react-native-async-storage/async-storage";

// asyncstorage will store meals in array with meals key
const TODO_KEY = "todo";
// get meals
// fetch whatever's stored, If so, If nothing's(first launch), returns an empty array []
export const getTodos = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(TODO_KEY);
  return data ? JSON.parse(data) : [];
};
// addmeal- create here call elsewhere
export const addTodo = async (
  //loads the existing meals array
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const meals = await getTodos();
  //Builds the new meal object by spreading your input and adding a generated id (current timestamp as a string) and createdAt (ISO date string)
  const newMeal: Meal = {
    ...meal,
    //Saves the updated array back — notice [newMeal, ...meals] puts the new meal first, so the list stays newest-first
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));
  //Returns the completed meal object so the caller can use it
  return newMeal;
};
export const deleteTodo = async (id: string): Promise<void> => {
  const meals = await getTodos();
  const filtered = meals.filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(TODO_KEY, JSON.stringify(filtered));
};
// clear meals set fresh each day
export const clearAllMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(TODO_KEY);
};
