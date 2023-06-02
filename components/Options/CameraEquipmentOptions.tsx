import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextInputOption from './TextInputOption';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { observer } from 'mobx-react-lite';

export default observer(function CameraEquipmentOptions() {
  const { cameraSettings } = useGlobalStore();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Camera Options</Text>
      <Text> Pixel Size:</Text>
      <TextInputOption defaultValue={cameraSettings?.PixelSize?.toString()} property={'CameraSettings-PixelSize'} suffix="μm" />
      <Text style={styles.textInput}>Bit Depth:</Text>
      <TextInputOption defaultValue={cameraSettings?.BitDepth?.toString()} property={'CameraSettings-BitDepth'} />
    </View>
  );
});

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    paddingBottom: 5,
  },
  container: {
    alignItems: 'center',
    // marginLeft: '1%',
    // borderColor: 'gray',
    // borderWidth: 1,
    // maxHeight: '60%',
  },
  cameraRow: {},
  textInput: {},
});
