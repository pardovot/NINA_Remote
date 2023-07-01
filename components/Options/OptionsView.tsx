import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import General from './General';
import EquipmentOptions from './EquipmentOptions';
import Autofocus from './Autofocus';
import ImagingOptions from './ImagingOptions';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { ScreenNavigationProp } from 'App';

const Tab = createMaterialTopTabNavigator();

export default function OptionsView({} : ScreenNavigationProp) {

  const { ip, activeProfile, fetchActiveProfile } = useGlobalStore();
  const [tabDisplay, setTabDisplay] = useState({ tabBarStyle: { position: 'absolute' }});

  let fetchInterval;

  // const handleScreenTabClick = () => {
  //   console.log("Click");
  //   setIsTabHidden(!isTabHidden);
  //   if (isTabHidden) {
  //       setTabDisplay({ tabBarStyle: { position: 'absolute', display: 'none' }, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/>});
  //   } else {
  //       setTabDisplay({ tabBarStyle: { position: 'absolute'}, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/> });
  //   }
  // }

  useEffect(() => {
    (async () => {
      await fetchActiveProfile();
      fetchInterval = setInterval(async () => {
          await fetchActiveProfile();
      }, 3000);
    })();
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={General}/>
      <Tab.Screen name="Equipment" component={EquipmentOptions}/>
      <Tab.Screen name="Autofocus" component={Autofocus}/>
      <Tab.Screen name="Imaging" component={ImagingOptions}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  MainMenuBtn: {
    position: "absolute",
    width: "15%",
    left: "5%",
  },
});
