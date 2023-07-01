import { StyleSheet, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import CameraEquipmentOptions from './CameraEquipmentOptions';
import TelescopeEquipmentOptions from './TelescopeEquipmentOptions';

export default observer(function EquipmentOptions() {

  return (
    <View style={styles.container}>
      <CameraEquipmentOptions />
      <TelescopeEquipmentOptions />
    </View>
  )
});

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '3%'},
});
