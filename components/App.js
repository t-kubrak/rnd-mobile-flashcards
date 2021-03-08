import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Nav from "./Nav";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
