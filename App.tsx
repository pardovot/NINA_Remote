import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StackScreenProps } from '@react-navigation/stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FirstConnect from './components/FirstConnect';
import LiveView from './components/LiveView';
import MainApp from './components/MainApp';
import { observer } from 'mobx-react-lite';

SystemNavigationBar.immersive();

export type RootStackParamList = {
  FirstConnect: undefined;
  LiveView: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenNavigationProp = StackScreenProps<RootStackParamList>;

const MyTheme = {
  colors: {
    background: 'rgb(30, 30, 30)',
    border: 'rgb(39, 39, 41)',
    card: 'rgb(18, 18, 18)',
    notification: 'rgb(255, 69, 58)',
    primary: 'rgb(10, 132, 255)',
    text: 'rgb(229, 229, 231)',
  },
  dark: true,
};

const App = observer(() => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar hidden translucent />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FirstConnect">{(props) => <FirstConnect {...props} />}</Stack.Screen>
        <Stack.Screen name="MainApp">{(props) => <MainApp {...props} />}</Stack.Screen>
        {/* <Stack.Screen name="Equipments">{(props) => <Equipments {...props} />}</Stack.Screen> */}
        {/* <Stack.Screen name="Sequencer">{(props) => <Sequencer {...props} />}</Stack.Screen> */}
        {/* <Stack.Screen name="Imaging">{(props) => <Imaging {...props} />}</Stack.Screen> */}
        {/* <Stack.Screen name="Options">{(props) => <OptionsView {...props} />}</Stack.Screen> */}
        <Stack.Screen name="LiveView">{(props) => <LiveView {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
