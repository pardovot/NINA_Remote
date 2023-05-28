import { StyleSheet, Text, View, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { observer } from 'mobx-react-lite';
import TextInputOption from './TextInputOption';
// import { Switch } from 'react-native-switch';

export default observer(function EquipmentOptions() {
  const { cameraSettings, telescopeSettings, setProfileEquipmentProperty } = useGlobalStore();

  const handleSyncSwitch = async () => {
    await setProfileEquipmentProperty('TelescopeSettings-NoSync', (!telescopeSettings.NoSync).toString());
  };

  return (
    <View>
      <View style={styles.cameraRow}>
        <Text> Pixel size:</Text>
        <TextInputOption defaultValue={cameraSettings?.PixelSize?.toString()} property={'CameraSettings-PixelSize'} />
        <Text style={styles.textInput}>Bit depth:</Text>
        <TextInputOption defaultValue={cameraSettings?.BitDepth?.toString()} property={'CameraSettings-BitDepth'} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
        <Text>Telescope name:</Text>
        <TextInputOption defaultValue={telescopeSettings?.Name} property={'TelescopeSettings-Name'} />
        <Text style={styles.textInput}>Focal length:</Text>
        <TextInputOption defaultValue={telescopeSettings?.FocalLength?.toString()} property={'TelescopeSettings-FocalLength'} />
        <Text style={styles.textInput}>Focal ratio:</Text>
        <TextInputOption defaultValue={telescopeSettings?.FocalRatio?.toString()} property={'TelescopeSettings-FocalRatio'} />
        <Text>Settle time after slew:</Text>
        <TextInputOption defaultValue={telescopeSettings?.SettleTime?.toString()} property={'TelescopeSettings-SettleTime'} suffix=" s" />
        <Text style={styles.textInput}>Automatic Sync:</Text>
        <Switch value={!telescopeSettings?.NoSync} onValueChange={handleSyncSwitch}  />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cameraRow: { flexDirection: 'row', alignItems: 'center', margin: 10, borderColor: 'red' },
  camera: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },
  telescope: {
    flex: 1,
    margin: 10,
  },
  filterWheel: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: '#ff726f',
  },
  textInput: {
    marginRight: 10,
  },
});
