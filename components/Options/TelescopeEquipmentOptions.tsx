import { StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import TextInputOption from './TextInputOption';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { observer } from 'mobx-react-lite';

export default observer(function TelescopeEquipmentOptions() {
  const { telescopeSettings, setProfileEquipmentProperty } = useGlobalStore();

  const { Name, FocalLength, FocalRatio, SettleTime, NoSync } = telescopeSettings || { Name: '', FocalLength: '--', FocalRatio: '--', SettleTime: '', NoSync: false };

  const handleSyncSwitch = async () => {
    await setProfileEquipmentProperty('TelescopeSettings-NoSync', (!telescopeSettings.NoSync).toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Telescope Options</Text>
      <Text>Telescope name:</Text>
      <TextInputOption defaultValue={Name?.toString()} property={'TelescopeSettings-Name'} />
      <Text style={styles.textInput}>Focal length:</Text>
      <TextInputOption defaultValue={FocalLength?.toString() == 'NaN' ? '--' : FocalLength?.toString()} property={'TelescopeSettings-FocalLength'} suffix=" mm" />
      <Text style={styles.textInput}>Focal ratio:</Text>
      <TextInputOption defaultValue={FocalRatio?.toString() == 'NaN' ? '--' : FocalRatio?.toString()} property={'TelescopeSettings-FocalRatio'} />
      <Text>Settle time after slew:</Text>
      <TextInputOption defaultValue={SettleTime?.toString()} property={'TelescopeSettings-SettleTime'} suffix="s" marginRight={-10} />
      <Text style={styles.textInput}>Automatic Sync:</Text>
      <Switch value={!NoSync} onValueChange={handleSyncSwitch} />
    </View>
  );
});

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    paddingBottom: 5,
  },
  container: {
    marginLeft: '1%',
    alignItems: 'center',
  },
  cameraRow: {},
  textInput: {},
});
