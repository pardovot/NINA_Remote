import { StyleSheet, Text, View, Button, Pressable, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';

type EquipmentItemProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Equipments'>;
  equipmentName?: string;
  savedProperties?: string[];
  innerProperties?: string[];
  shortenedName?: string;
};

const EquipmentItem = observer(
  ({ navigation, equipmentName, savedProperties, innerProperties, shortenedName: shortenedName }: EquipmentItemProps) => {
    const { ip, client, handleScreenTabClick, fetchData, fetchPost } = useGlobalStore();
    const [isItemConnected, setIsItemConnected] = useState(false);
    const [equipmentData, setEquipmentData] = useState({});

    const lowerCaseEquipmentName = equipmentName.toLowerCase();

    let fetchInterval;

    client.onmessage = async (evt: { data: string }) => {
      console.log('onmessage', JSON.parse(evt.data));
      const message = JSON.parse(evt.data).Response;
      console.log(`message: ${message}`);
      if (message == `NINA-${equipmentName.toUpperCase()}-CONNECTION-CHANGED` || message == 'NINA-FILTER-CONNECTION-CHANGED') {
        await fetchEquipmentAPI();
      }
    };

    useEffect(() => {
      (async () => {
        await fetchEquipmentAPI();
        fetchInterval = setInterval(async () => {
          if (isItemConnected) {
            await fetchEquipmentAPI();
          }
        }, 3000);
      })();
      return () => {
        clearInterval(fetchInterval);
      };
    }, []);

    const fetchEquipmentAPI = async () => {
      if (ip) {
        const { json } = await fetchData(`equipment?property=${lowerCaseEquipmentName}`);
        setEquipmentData(json.Response);
        if (json.Response.Connected) {
          setIsItemConnected(true);
        } else {
          setIsItemConnected(false);
        }
      }
    };

    function PropertiesSet({ property, value }) {
      if (property == 'Temperature') value = Number(value).toFixed(2).toString();
      return (
        <View style={styles.section}>
          <Text style={styles.property}>{property}:</Text>
          {isItemConnected && <Text style={styles.value}>{value}</Text>}
        </View>
      );
    }

    const handleEquipmentConnection = async (action) => {
      const body = {
        Device: lowerCaseEquipmentName,
        Action: action,
      };

      await fetchPost('equipment', body);
      setTimeout(() => {
        fetchEquipmentAPI();
      }, 500);
    };

    const handleSwitch = async () => {
      if (isItemConnected) {
        handleEquipmentConnection('disconnect');
      } else {
        handleEquipmentConnection('connect');
      }
    };

    return (
      <Pressable style={styles.container} onLongPress={handleScreenTabClick}>
        <View>
          <Switch style={styles.switch} value={isItemConnected} onValueChange={handleSwitch} />
          <Text style={isItemConnected ? styles.connectedText : styles.disItemConnectedText}>{isItemConnected ? 'Connected' : 'Disconnected'}</Text>
        </View>
        <View style={styles.equipmentContainer}>
          {isItemConnected &&
            savedProperties.map((item, key) => {
              const obj = equipmentData[item];
              if (obj && typeof obj == 'object') {
                return innerProperties.map((innerItem, key) => {
                  return <PropertiesSet property={shortenedName + ' ' + innerItem.replace('_', '')} value={obj[innerItem]?.toString()} key={key} />;
                });
              } else {
                return <PropertiesSet property={item} value={equipmentData[item]?.toString()} key={key} />;
              }
            })}
        </View>
        <TouchableOpacity style={styles.MainMenuBtn}>
          <Button title="Main Menu" onPress={() => navigation.navigate('MainView')} />
        </TouchableOpacity>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 30,
  },
  equipmentContainer: {
    marginRight: 50,
    height: '60%',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    width: 200,
  },
  connectedText: {
    color: 'green',
  },
  disItemConnectedText: {
    color: 'red',
  },
  switch: {
    marginBottom: 5,
    marginLeft: 15,
  },
  property: {
    width: 120,
  },
  MainMenuBtn: {
    position: 'absolute',
    width: '15%',
    right: '5%',
  },
  value: {},
});

export default EquipmentItem;
