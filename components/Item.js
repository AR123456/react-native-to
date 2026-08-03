import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
const Item = ({ title, onEdit, onDelete }) => {
  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.actions}>
          <Ionicons name="pencil" size={24} color="#555" onPress={onEdit} />
          <Ionicons
            name="trash-outline"
            size={22}
            color="#555"
            onPress={onDelete}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
