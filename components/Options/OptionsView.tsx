import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import General from './General';
import EquipmentOptions from './EquipmentOptions';
import Autofocus from './Autofocus';
import ImagingOptions from './ImagingOptions';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { ScreenNavigationProp } from 'App';
// import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons'; // Replace 'FontAwesome' with the appropriate icon pack

const Tab = createMaterialTopTabNavigator();

export default function OptionsView({navigation}: ScreenNavigationProp) {

  const { ip, activeProfile, setActiveProfile, fetchData } = useGlobalStore();
  const [tabDisplay, setTabDisplay] = useState({ tabBarStyle: { position: 'absolute' }});

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
    const fetchActiveProfile = async() => {
      const { json } = await fetchData("profile?property=active");
      setActiveProfile(json.Response);
    }

    fetchActiveProfile();
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

{/* <Tab.Screen name="General">
{props => <General {...props} navigation={navigation} />}
</Tab.Screen>
<Tab.Screen name="Equipment">
{props => <EquipmentOptions {...props} navigation={navigation} />}
</Tab.Screen>
<Tab.Screen name="Autofocus">
{props => <Autofocus {...props} navigation={navigation} />}
</Tab.Screen>
<Tab.Screen name="Imaging">
{props => <ImagingOptions {...props} navigation={navigation}  />}
</Tab.Screen> */}