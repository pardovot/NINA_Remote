import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { ScreenNavigationProp } from 'App';

export default function Sequencer({navigation}: ScreenNavigationProp) {
  return (
    <View style={styles.container}>
      <Text>Sequencer</Text>
      <TouchableOpacity style={styles.MainMenuBtn} >
            <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 30,
  },
  MainMenuBtn: {
    position: "absolute",
    width: "15%",
    right: "5%",
  },
});
